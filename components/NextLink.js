/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

const NextLink = function NextLink({
  href,
  className,
  style,
  children,
  replace,
}) {
  return (
    <>
      {replace && (
        <Link href={href} replace>
          <a className={className || "default"} style={style || {}}>
            {children}
          </a>
        </Link>
      )}

      {!replace && (
        <Link href={href}>
          <a className={className || "default"} style={style || {}}>
            {children}
          </a>
        </Link>
      )}
    </>
  );
};

export default NextLink;
