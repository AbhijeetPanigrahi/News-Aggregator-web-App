import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faLink, faCheck } from '@fortawesome/free-solid-svg-icons';

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareBtnClass = "flex items-center justify-center w-10 h-10 rounded-full bg-surface text-text-primary border border-border no-underline transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:text-white hover:border-transparent hover:shadow-lg group";

  return (
    <div className="flex gap-3 mt-2.5 flex-wrap">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shareBtnClass} hover:bg-[#1DA1F2]`}
        title="Share on Twitter"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shareBtnClass} hover:bg-[#4267B2]`}
        title="Share on Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shareBtnClass} hover:bg-[#0077B5]`}
        title="Share on LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 h-10 rounded-full bg-surface text-text-primary border border-border cursor-pointer text-sm font-semibold transition-all duration-200 hover:bg-surface-highlight hover:-translate-y-px active:translate-y-0"
      >
        {copied ? (
          <>
            <FontAwesomeIcon icon={faCheck} /> Copied
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faLink} /> Copy Link
          </>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
