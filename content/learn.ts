const MONGODB_WINDOWS_INSTALLATION =
  "https://www.youtube.com/watch?v=gB6WLkSrtJk";

// https://ui.lndev.me/components

  

  const handleShareHook = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          url: currentUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;

    window.open(whatsappUrl, "_blank");
  };