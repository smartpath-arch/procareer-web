"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface InstagramEmbedProps {
  postUrl: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ postUrl }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== "undefined" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [isClient, postUrl]);

  const embedHtml = `
    <blockquote 
      class="instagram-media" 
      data-instgrm-captioned 
      data-instgrm-permalink="${postUrl}" 
      data-instgrm-version="14" 
      style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
    </blockquote>
  `;

  const hideCss = `
    <style>
      /* Hide Caption */
      .instagram-media .e1e1d .C4VMK {
        display: none;
      }
      /* Hide Likes and Comments */
      .instagram-media .e1e1d .Nm9Fw {
        display: none;
      }
      /* Hide Username */
      .instagram-media .e1e1d .v1Nh3 {
        display: none;
      }
      /* Hide other unnecessary elements */
      .instagram-media .e1e1d .QyZnL {
        display: none;
      }
    </style>
  `;

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
      <div dangerouslySetInnerHTML={{ __html: hideCss }} />
      <Script
        async
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }}
      />
    </div>
  );
};

export default InstagramEmbed;
