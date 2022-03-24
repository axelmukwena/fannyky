/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link"

const NextLink = function NextLink({ href, as, className, style, children }) {
	return (
		<Link href={href} as={as}>
			<a className={className || "default"} style={style || {}}>
				{children}
			</a>
		</Link>
	)
}

export default NextLink
