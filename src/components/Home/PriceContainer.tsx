import { PriceCard } from "./PriceCard";



export function PriceContainer() {
    return (
        <section id="pricing" className="w-full bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Construído para empresas como a sua</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {/* <!-- Pricing Card --> */}
                    <PriceCard title="Free" price={0} description="Best option for personal use & for your next project." />
                    {/* <!-- Pricing Card --> */}
                    <PriceCard title="MEI" price={10} description="Relevant for multiple users, extended & premium support." />
                    {/* <!-- Pricing Card --> */}
                    <PriceCard title="Premium" price={20} description="Best for large scale uses and extended redistribution rights." />

                </div>
            </div>
        </section>
    )
}