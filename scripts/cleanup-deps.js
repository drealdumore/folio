#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

// Colors for terminal output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

class DependencyCleanup {
  constructor() {
    this.packageManager = this.detectPackageManager();
    this.packageJson = this.loadPackageJson();
    this.dependencies = {
      ...(this.packageJson.dependencies || {}),
      ...(this.packageJson.devDependencies || {}),
    };
    this.unusedPackages = [];
    this.debugMode = process.argv.includes("--debug");
  }

  detectPackageManager() {
    if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
    if (fs.existsSync("yarn.lock")) return "yarn";
    if (fs.existsSync("package-lock.json")) return "npm";
    return "npm"; // default
  }

  loadPackageJson() {
    try {
      return JSON.parse(fs.readFileSync("package.json", "utf8"));
    } catch (error) {
      console.error(
        `${colors.red}Error: Could not read package.json${colors.reset}`
      );
      process.exit(1);
    }
  }

  // Get all files to scan (excluding node_modules, .git, etc.)
  getAllFiles(dir = ".", files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip these directories
      if (entry.isDirectory()) {
        if (
          ![
            "node_modules",
            ".git",
            ".next",
            "dist",
            "build",
            ".vercel",
          ].includes(entry.name)
        ) {
          this.getAllFiles(fullPath, files);
        }
      } else if (entry.isFile()) {
        // Only scan relevant file types
        const ext = path.extname(entry.name);
        if (
          [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".json",
            ".md",
            ".css",
            ".scss",
          ].includes(ext)
        ) {
          files.push(fullPath);
        }
      }
    }

    return files;
  }

  // Check if a package is used in the codebase
  isPackageUsed(packageName) {
    const files = this.getAllFiles();

    // Escape special regex characters in package name
    const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // More precise import patterns - must be exact matches
    const patterns = [
      // ES6 imports: import ... from 'package'
      new RegExp(`import\\s+[^;]+\\s+from\\s+['"\`]${escapedName}['"\`]`, "gm"),
      // Side effect imports: import 'package'
      new RegExp(`^\\s*import\\s+['"\`]${escapedName}['"\`]`, "gm"),
      // CommonJS: require('package')
      new RegExp(`require\\s*\\(\\s*['"\`]${escapedName}['"\`]\\s*\\)`, "gm"),
      // Dynamic imports: import('package')
      new RegExp(`import\\s*\\(\\s*['"\`]${escapedName}['"\`]\\s*\\)`, "gm"),
      // Subpath imports: from 'package/subpath'
      new RegExp(`from\\s+['"\`]${escapedName}/[^'"\`]*['"\`]`, "gm"),
      new RegExp(
        `require\\s*\\(\\s*['"\`]${escapedName}/[^'"\`]*['"\`]\\s*\\)`,
        "gm"
      ),
      new RegExp(
        `import\\s*\\(\\s*['"\`]${escapedName}/[^'"\`]*['"\`]\\s*\\)`,
        "gm"
      ),
    ];

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, "utf8");

        for (const pattern of patterns) {
          if (pattern.test(content)) {
            return true;
          }
        }
      } catch (error) {
        // Skip files that can't be read
        continue;
      }
    }

    return false;
  }

  // Special cases for packages that might not show up in imports
  isSpecialPackage(packageName) {
    const specialPackages = {
      // Build tools and configs
      typescript: () => fs.existsSync("tsconfig.json"),
      eslint: () =>
        fs.existsSync(".eslintrc.json") || fs.existsSync(".eslintrc.js"),
      prettier: () =>
        fs.existsSync(".prettierrc") || fs.existsSync("prettier.config.js"),
      postcss: () =>
        fs.existsSync("postcss.config.js") ||
        fs.existsSync("postcss.config.mjs"),
      tailwindcss: () =>
        fs.existsSync("tailwind.config.js") ||
        fs.existsSync("tailwind.config.ts"),

      // Next.js related
      next: () =>
        this.packageJson.scripts &&
        Object.values(this.packageJson.scripts).some((script) =>
          script.includes("next")
        ),

      // Package managers
      pnpm: () => this.packageManager === "pnpm",
      yarn: () => this.packageManager === "yarn",

      // Types packages (often not directly imported)
      "@types/node": () => true, // Usually needed for Node.js types
      "@types/react": () => this.dependencies["react"],
      "@types/react-dom": () => this.dependencies["react-dom"],
    };

    if (specialPackages[packageName]) {
      return specialPackages[packageName]();
    }

    // Check if it's a @types package for an existing dependency
    if (packageName.startsWith("@types/")) {
      const basePackage = packageName.replace("@types/", "");
      return !!this.dependencies[basePackage];
    }

    return false;
  }

  analyzeUnusedPackages() {
    console.log(
      `${colors.blue}${colors.bold}🔍 Analyzing dependencies...${colors.reset}\n`
    );

    const packageNames = Object.keys(this.dependencies);
    let checkedCount = 0;

    for (const packageName of packageNames) {
      if (!this.debugMode) {
        process.stdout.write(
          `\r${colors.cyan}Checking: ${packageName}${" ".repeat(50)}`
        );
      }

      const isUsed = this.isPackageUsed(packageName);
      const isSpecial = this.isSpecialPackage(packageName);

      if (this.debugMode) {
        console.log(`${colors.cyan}Checking: ${packageName}${colors.reset}`);
        console.log(
          `  Used in code: ${
            isUsed ? colors.green + "YES" : colors.red + "NO"
          }${colors.reset}`
        );
        console.log(
          `  Special package: ${
            isSpecial ? colors.green + "YES" : colors.red + "NO"
          }${colors.reset}`
        );
        console.log(
          `  Result: ${
            isUsed || isSpecial ? colors.green + "KEEP" : colors.red + "UNUSED"
          }${colors.reset}\n`
        );
      }

      if (!isUsed && !isSpecial) {
        this.unusedPackages.push(packageName);
      }

      checkedCount++;
    }

    if (!this.debugMode) {
      process.stdout.write("\r" + " ".repeat(80) + "\r"); // Clear the line
    }
    console.log(
      `${colors.green}✅ Analyzed ${checkedCount} packages${colors.reset}\n`
    );
  }

  async promptUser(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.toLowerCase().trim());
      });
    });
  }

  async removePackage(packageName) {
    try {
      const command = `${this.packageManager} ${
        this.packageManager === "npm" ? "uninstall" : "remove"
      } ${packageName}`;
      console.log(`${colors.yellow}Running: ${command}${colors.reset}`);
      execSync(command, { stdio: "inherit" });
      console.log(`${colors.green}✅ Removed ${packageName}${colors.reset}\n`);
    } catch (error) {
      console.log(
        `${colors.red}❌ Failed to remove ${packageName}${colors.reset}\n`
      );
    }
  }

  async run() {
    console.log(
      `${colors.magenta}${colors.bold}📦 Dependency Cleanup Tool${colors.reset}`
    );
    console.log(
      `${colors.cyan}Package Manager: ${this.packageManager}${colors.reset}\n`
    );

    this.analyzeUnusedPackages();

    if (this.unusedPackages.length === 0) {
      console.log(
        `${colors.green}🎉 No unused packages found! Your dependencies are clean.${colors.reset}`
      );
      return;
    }

    console.log(
      `${colors.yellow}${colors.bold}📋 Found ${this.unusedPackages.length} potentially unused packages:${colors.reset}`
    );
    this.unusedPackages.forEach((pkg, index) => {
      console.log(`${colors.red}  ${index + 1}. ${pkg}${colors.reset}`);
    });
    console.log();

    const removeAll = await this.promptUser(
      `${colors.blue}Do you want to remove all unused packages? (y/n): ${colors.reset}`
    );

    if (removeAll === "y" || removeAll === "yes") {
      for (const packageName of this.unusedPackages) {
        await this.removePackage(packageName);
      }
    } else {
      // Ask for each package individually
      for (const packageName of this.unusedPackages) {
        const remove = await this.promptUser(
          `${colors.blue}Remove ${colors.bold}${packageName}${colors.reset}${colors.blue}? (y/n): ${colors.reset}`
        );

        if (remove === "y" || remove === "yes") {
          await this.removePackage(packageName);
        }
      }
    }

    console.log(
      `${colors.green}${colors.bold}✨ Cleanup complete!${colors.reset}`
    );
  }
}

// Run the cleanup
const cleanup = new DependencyCleanup();
cleanup.run().catch(console.error);
