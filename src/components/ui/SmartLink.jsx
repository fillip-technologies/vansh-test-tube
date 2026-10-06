import { Link } from 'react-router'

// Internal routes ("/treatments/ivf", "/#faq") navigate client-side;
// in-page anchors ("#consultation") and external links stay plain <a>.
export default function SmartLink({ href = '', children, ...props }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
