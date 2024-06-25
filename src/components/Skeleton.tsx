import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = () => (
  <div className="pizza-block">
    <ContentLoader
      speed={1.7}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#e8e3e3"
      foregroundColor="#e5caa4">
      <rect x="9" y="323" rx="14" ry="14" width="260" height="76" />
      <rect x="9" y="278" rx="10" ry="10" width="260" height="29" />
      <rect x="136" y="419" rx="18" ry="18" width="133" height="36" />
      <circle cx="138" cy="133" r="124" />
      <rect x="20" y="443" rx="0" ry="0" width="0" height="1" />
      <rect x="9" y="419" rx="18" ry="18" width="80" height="36" />
    </ContentLoader>
  </div>
)

export default Skeleton
