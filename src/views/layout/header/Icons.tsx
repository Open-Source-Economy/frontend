export function FundIssueIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="w-6 h-6">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* Paths with the `stroke-current` to use the current color */}
      <path
        d="M11.625 10.2969C14.3174 10.2969 16.5 9.6253 16.5 8.79687C16.5 7.96845 14.3174 7.29688 11.625 7.29688C8.93261 7.29688 6.75 7.96845 6.75 8.79687C6.75 9.6253 8.93261 10.2969 11.625 10.2969Z"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]" // Apply gradient on hover
      />
      <path
        d="M16.5 12.1719C16.5 13.0003 14.3174 13.6719 11.625 13.6719C8.93257 13.6719 6.75 13.0003 6.75 12.1719"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
      />
      <path
        d="M16.5 8.79688V15.3969C16.5 16.3081 14.3174 17.0469 11.625 17.0469C8.93257 17.0469 6.75 16.3081 6.75 15.3969V8.79688"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
      />
      <path
        d="M6.375 5.04687C9.06739 5.04687 11.25 4.3753 11.25 3.54687C11.25 2.71845 9.06739 2.04688 6.375 2.04688C3.68261 2.04688 1.5 2.71845 1.5 3.54687C1.5 4.3753 3.68261 5.04687 6.375 5.04687Z"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
      />
      <path
        d="M4.5 8.79688C3.08114 8.62423 1.77743 8.17775 1.5 7.29688M4.5 12.5469C3.08114 12.3742 1.77743 11.9278 1.5 11.0469"
        strokeLinecap="round"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
      />
      <path
        d="M4.5 16.2969C3.08114 16.1242 1.77743 15.6778 1.5 14.7969V3.54688"
        strokeLinecap="round"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
      />
      <path d="M11.25 5.04687V3.54688" strokeLinecap="round" className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]" />
    </svg>
  );
}

export const FundungHistoryIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="w-6 h-6">
      <defs>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* Path 1 with stroke-current and duration-200 group-hover */}
      <path
        d="M14.214 7.00181L16.0966 6.8872C14.7471 3.32546 10.8728 1.29681 7.09531 2.30543C3.07199 3.3797 0.682225 7.49268 1.7576 11.492C2.83299 15.4914 6.96629 17.8626 10.9896 16.7883C13.9769 15.9907 16.0635 13.5179 16.5 10.6602"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient2)]"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      {/* Path 2 with stroke-current and duration-200 group-hover */}
      <path
        d="M9 6.54688V9.54686L10.5 11.0469"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient2)]"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const OrderIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="group w-6 h-6">
      <defs>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* Path 1 with stroke-current and duration-200 group-hover to change color on hover */}
      <path
        d="M6 12.5469H11.4474C14.8131 12.5469 15.325 10.4325 15.9457 7.34869C16.1248 6.45921 16.2144 6.01447 15.9991 5.71818C15.7837 5.42188 15.371 5.42188 14.5456 5.42188H4.5"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient3)]"
        stroke-linecap="round"
      />

      {/* Path 2 with stroke-current and duration-200 group-hover */}
      <path
        d="M6 12.5469L4.03405 3.18307C3.86711 2.51532 3.26714 2.04688 2.57884 2.04688H1.875"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient3)]"
        stroke-linecap="round"
      />

      {/* Path 3 with stroke-current and duration-200 group-hover */}
      <path
        d="M6.66 12.5469H6.35143C5.32891 12.5469 4.5 13.4103 4.5 14.4754C4.5 14.6529 4.63815 14.7969 4.80857 14.7969H13.125"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient3)]"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      {/* Path 4 with stroke-current and duration-200 group-hover */}
      <path
        d="M7.875 17.0469C8.49632 17.0469 9 16.5432 9 15.9219C9 15.3006 8.49632 14.7969 7.875 14.7969C7.25368 14.7969 6.75 15.3006 6.75 15.9219C6.75 16.5432 7.25368 17.0469 7.875 17.0469Z"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient3)]"
      />

      {/* Path 5 with stroke-current and duration-200 group-hover */}
      <path
        d="M13.125 17.0469C13.7463 17.0469 14.25 16.5432 14.25 15.9219C14.25 15.3006 13.7463 14.7969 13.125 14.7969C12.5037 14.7969 12 15.3006 12 15.9219C12 16.5432 12.5037 17.0469 13.125 17.0469Z"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient3)]"
      />
    </svg>
  );
};

export const BillingIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="group w-6 h-6">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* Path 1 with duration-200 group-hover to apply gradient stroke on hover */}
      <path
        d="M3 14.5312V6.58757C3 4.44706 3 3.37681 3.65901 2.71185C4.31802 2.04688 5.37868 2.04688 7.5 2.04688H10.5C12.6213 2.04688 13.6819 2.04688 14.341 2.71185C15 3.37681 15 4.44706 15 6.58757V14.5312C15 15.665 15 16.2319 14.6535 16.455C14.0873 16.8197 13.2121 16.0549 12.7718 15.7774C12.4081 15.5479 12.2263 15.4333 12.0244 15.4267C11.8063 15.4195 11.6212 15.5295 11.2282 15.7774L9.795 16.6812C9.40837 16.9249 9.2151 17.0469 9 17.0469C8.7849 17.0469 8.59162 16.9249 8.205 16.6812L6.77185 15.7774C6.40811 15.5479 6.22624 15.4333 6.0244 15.4267C5.80629 15.4195 5.6212 15.5295 5.22815 15.7774C4.78796 16.0549 3.91265 16.8197 3.34646 16.455C3 16.2319 3 15.665 3 14.5312Z"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient1)]"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      {/* Path 2 with duration-200 group-hover to apply gradient stroke on hover */}
      <path d="M8.25 8.79688H6" className="stroke-white duration-200 group-hover:stroke-[#ff518c]" stroke-linecap="round" stroke-linejoin="round" />

      {/* Path 3 with duration-200 group-hover to apply gradient stroke on hover */}
      <path d="M10.5 5.79688H6" className="stroke-white duration-200 group-hover:stroke-[#ff518c]" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};
export const ProfileIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="group w-6 h-6">
      <defs>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* Circle Path with gradient on hover */}
      <path
        d="M9 17.0469C13.1421 17.0469 16.5 13.689 16.5 9.54688C16.5 5.40474 13.1421 2.04688 9 2.04688C4.85786 2.04688 1.5 5.40474 1.5 9.54688C1.5 13.689 4.85786 17.0469 9 17.0469Z"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient2)]"
      />

      {/* Path with gradient on hover (first line) */}
      <path
        d="M5.625 13.2969C7.37378 11.4652 10.6074 11.379 12.375 13.2969"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient2)]"
        stroke-linecap="round"
      />

      {/* Path with gradient on hover (second line) */}
      <path
        d="M10.8713 7.67188C10.8713 8.7074 10.0306 9.54688 8.99362 9.54688C7.95667 9.54688 7.11598 8.7074 7.11598 7.67188C7.11598 6.63634 7.95667 5.79688 8.99362 5.79688C10.0306 5.79688 10.8713 6.63634 10.8713 7.67188Z"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient2)]"
        stroke-linecap="round"
      />
    </svg>
  );
};
export const MaintainerIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="group w-6 h-6">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* First Path with stroke on hover */}
      <path
        d="M11.625 9.54688C11.625 10.9966 10.4497 12.1719 9 12.1719C7.55025 12.1719 6.375 10.9966 6.375 9.54688C6.375 8.09713 7.55025 6.92188 9 6.92188C10.4497 6.92188 11.625 8.09713 11.625 9.54688Z"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient1)]"
      />

      {/* Second Path with stroke on hover */}
      <path
        d="M15.7582 11.118C16.1497 11.0125 16.3454 10.9597 16.4227 10.8587C16.5 10.7579 16.5 10.5955 16.5 10.2708V8.82054C16.5 8.49587 16.5 8.33349 16.4227 8.23262C16.3454 8.13167 16.1497 8.07887 15.7582 7.97333C14.2954 7.57884 13.3799 6.04953 13.7575 4.5963C13.8613 4.19664 13.9132 3.99681 13.8636 3.87961C13.814 3.76241 13.6718 3.68165 13.3873 3.52011L12.0938 2.78569C11.8146 2.62719 11.675 2.54793 11.5498 2.56481C11.4245 2.58168 11.2832 2.72269 11.0004 3.00469C9.906 4.0965 8.0952 4.09646 7.00076 3.00462C6.71807 2.72262 6.57673 2.58162 6.45145 2.56473C6.32617 2.54786 6.18658 2.62711 5.9074 2.78562L4.61388 3.52005C4.3294 3.68157 4.18715 3.76233 4.13758 3.87951C4.08801 3.99669 4.1399 4.19655 4.24369 4.59624C4.62103 6.04952 3.70479 7.57887 2.24177 7.97334C1.85034 8.07887 1.65463 8.13167 1.57731 8.23254C1.5 8.33349 1.5 8.49587 1.5 8.82054V10.2708C1.5 10.5955 1.5 10.7579 1.57731 10.8587C1.65461 10.9597 1.85033 11.0125 2.24177 11.118C3.70455 11.5125 4.62006 13.0418 4.24254 14.495C4.13872 14.8947 4.0868 15.0945 4.13637 15.2117C4.18595 15.329 4.32819 15.4097 4.61269 15.5712L5.90621 16.3057C6.18541 16.4642 6.325 16.5434 6.4503 16.5266C6.57559 16.5097 6.71691 16.3686 6.99953 16.0866C8.09453 14.9939 9.9066 14.9939 11.0017 16.0865C11.2843 16.3686 11.4256 16.5096 11.5509 16.5265C11.6762 16.5434 11.8158 16.4641 12.095 16.3056L13.3885 15.5711C13.673 15.4097 13.8153 15.3289 13.8648 15.2117C13.9144 15.0944 13.8625 14.8946 13.7586 14.495C13.3809 13.0418 14.2957 11.5126 15.7582 11.118Z"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient1)]"
        stroke-linecap="round"
      />
    </svg>
  );
};
export const LogOutIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className="group w-6 h-6">
      <defs>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      {/* First Path with gradient on hover */}
      <path
        d="M11.25 13.7656C11.1948 15.1545 10.0373 16.3339 8.4867 16.296C8.12595 16.2871 7.68007 16.1614 6.78834 15.9099C4.64221 15.3045 2.77916 14.2871 2.33217 12.008C2.25 11.5891 2.25 11.1177 2.25 10.1748V8.9189C2.25 7.97608 2.25 7.50466 2.33217 7.08572C2.77916 4.80661 4.64221 3.78924 6.78834 3.1839C7.68007 2.93235 8.12595 2.80659 8.4867 2.79777C10.0373 2.75983 11.1948 3.93918 11.25 5.32813"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient2)]"
        stroke-width="1.2"
        stroke-linecap="round"
      />

      {/* Second Path with gradient on hover */}
      <path
        d="M15.75 9.54688H7.5M15.75 9.54688C15.75 9.02172 14.2543 8.04052 13.875 7.67188M15.75 9.54688C15.75 10.072 14.2543 11.0533 13.875 11.4219"
        className="stroke-white duration-200 group-hover:stroke-[url(#gradient2)]"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const EuroIcon = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className=" w-6 h-6">
      <defs>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      <path d="M3.75 8.04688H9.75" className=" duration-200 stroke-[#ff518c]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.75 11.0469H9.75" className=" duration-200 stroke-[#ff518c]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.25 13.7526C13.402 15.2772 11.859 16.2969 10.0961 16.2969C7.4197 16.2969 5.25 13.9464 5.25 11.0469V8.04688C5.25 5.14738 7.4197 2.79688 10.0961 2.79688C11.859 2.79688 13.402 3.81656 14.25 5.34118"
        className=" duration-200 stroke-[url(#gradient2)]"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
export const EuroIconTwo = () => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" className=" w-6 h-6">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>

      <path
        d="M3.75 8.04688H9.75"
        className="stroke-current duration-200 group-hover:stroke-[#ff518c]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 11.0469H9.75"
        className="stroke-current duration-200 group-hover:stroke-[#ff518c]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 13.7526C13.402 15.2772 11.859 16.2969 10.0961 16.2969C7.4197 16.2969 5.25 13.9464 5.25 11.0469V8.04688C5.25 5.14738 7.4197 2.79688 10.0961 2.79688C11.859 2.79688 13.402 3.81656 14.25 5.34118"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>
      <path
        d="M19 5L5 19M5 5L19 19"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7E4B" />
          <stop offset="50%" stopColor="#FF518C" />
          <stop offset="100%" stopColor="#66319B" />
        </linearGradient>
      </defs>
      <path
        d="M3.75 10.5L6.375 13.125L14.25 4.875"
        className="stroke-current duration-200 group-hover:stroke-[url(#gradient1)]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
