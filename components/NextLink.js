/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

const NextLink = function NextLink({ href, className, style, children }) {
  return (
    <Link href={href}>
      <a className={className || ""} style={style || {}}>
        {children}
      </a>
    </Link>
  );
};

export default NextLink;
