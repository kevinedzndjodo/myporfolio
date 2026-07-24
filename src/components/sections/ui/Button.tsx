interface ButtonProps {
    children: string
    href: string
}

function Button({ children, href }: ButtonProps) {
    return (

        <a href={href}
            className="inline-block w-fit bg-accent text-background px-5 py-2.5 md:px-6 md:py-3 rounded-md font-medium hover:opacity-90 transition text-sm md:text-base"
        >
            {children}
        </a>
    )
}

export default Button