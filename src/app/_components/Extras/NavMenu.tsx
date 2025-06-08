type Props = {
    open: boolean;
}

export default function NavMenu({ open }: Props) {
    return (
        <section className={`w-full fixed z-30 block sm:hidden ${open ? 'left-0' : 'left-[-100%]'} transition-all duration-700 ease-initial h-screen bg-zinc-50`}>

        </section>
    )
}