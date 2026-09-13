import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

function Landing() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-[#08090A] text-[#F2F2F2]">

                {/* Navbar */}
                <nav className="
                    border-b
                    border-[#24272B]
                    bg-[#0B0C0E]
                ">
                    <div className="
                        max-w-6xl
                        mx-auto
                        px-6
                        py-4
                        flex
                        items-center
                        justify-between
                    ">
                        <Link
                            to="/"
                            className="
                                text-lg
                                font-semibold
                                tracking-tight
                            "
                        >
                            O-No
                        </Link>

                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="
                                    px-4
                                    py-2
                                    text-sm
                                    text-[#A1A3A8]
                                    transition-colors
                                    duration-200
                                    hover:text-[#F2F2F2]
                                "
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/register"
                                className="
                                    bg-[#F2F2F2]
                                    text-[#08090A]
                                    rounded-lg
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    hover:bg-white
                                    hover:-translate-y-0.5
                                "
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <main>

                    <section className="
                        max-w-5xl
                        mx-auto
                        px-6
                        pt-24
                        pb-24
                        md:pt-32
                        md:pb-32
                        text-center
                    ">

                        <p className="
                            text-xs
                            font-medium
                            tracking-[0.2em]
                            text-[#686A70]
                            uppercase
                            mb-6
                        ">
                            INTERVIEW PREPARATION
                        </p>

                        <h1 className="
                            max-w-3xl
                            mx-auto
                            text-4xl
                            md:text-6xl
                            font-semibold
                            tracking-tight
                            leading-tight
                        ">
                            Your interview preparation,
                            <span className="block text-[#A1A3A8]">
                                organized properly.
                            </span>
                        </h1>

                        <p className="
                            max-w-xl
                            mx-auto
                            mt-7
                            text-base
                            md:text-lg
                            leading-7
                            text-[#686A70]
                        ">
                            Keep your coding questions, progress,
                            revision schedule, and notes in one
                            focused workspace.
                        </p>

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            items-center
                            justify-center
                            gap-3
                            mt-9
                        ">
                            <Link
                                to="/register"
                                className="
                                    w-full
                                    sm:w-auto
                                    bg-[#F2F2F2]
                                    text-[#08090A]
                                    rounded-lg
                                    px-6
                                    py-3
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    hover:bg-white
                                    hover:-translate-y-0.5
                                "
                            >
                                Start Preparing →
                            </Link>

                            <Link
                                to="/login"
                                className="
                                    w-full
                                    sm:w-auto
                                    border
                                    border-[#24272B]
                                    rounded-lg
                                    px-6
                                    py-3
                                    text-sm
                                    text-[#A1A3A8]
                                    transition-all
                                    duration-200
                                    hover:border-[#41444A]
                                    hover:text-[#F2F2F2]
                                "
                            >
                                Sign In
                            </Link>
                        </div>

                    </section>

                    {/* Features */}
                    <section className="
                        border-y
                        border-[#24272B]
                    ">
                        <div className="
                            max-w-6xl
                            mx-auto
                            px-6
                            py-20
                        ">

                            <div className="text-center mb-12">
                                <p className="
                                    text-xs
                                    font-medium
                                    tracking-[0.2em]
                                    text-[#686A70]
                                    uppercase
                                    mb-4
                                ">
                                    ONE WORKSPACE
                                </p>

                                <h2 className="
                                    text-2xl
                                    md:text-3xl
                                    font-semibold
                                    tracking-tight
                                ">
                                    Everything you need to prepare.
                                </h2>
                            </div>

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-3
                                gap-px
                                bg-[#24272B]
                                border
                                border-[#24272B]
                                rounded-xl
                                overflow-hidden
                            ">

                                <Feature
                                    title="Questions"
                                    description="Organize problems by difficulty, platform, topic, and status."
                                />

                                <Feature
                                    title="Progress"
                                    description="Track confidence, favorites, revision count, and what needs attention."
                                />

                                <Feature
                                    title="Revision"
                                    description="Keep important problems in your review cycle and stay consistent."
                                />

                            </div>

                        </div>
                    </section>

                    {/* Product preview */}
                    <section className="
                        max-w-6xl
                        mx-auto
                        px-6
                        py-24
                    ">

                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-12
                            items-center
                        ">

                            <div>
                                <p className="
                                    text-xs
                                    font-medium
                                    tracking-[0.2em]
                                    text-[#686A70]
                                    uppercase
                                    mb-5
                                ">
                                    BUILT FOR CONSISTENCY
                                </p>

                                <h2 className="
                                    text-3xl
                                    md:text-4xl
                                    font-semibold
                                    tracking-tight
                                    leading-tight
                                ">
                                    Practice is better
                                    when you can see
                                    your progress.
                                </h2>

                                <p className="
                                    text-[#686A70]
                                    mt-5
                                    leading-7
                                    max-w-lg
                                ">
                                    O-No gives you a simple system
                                    for managing the problems you solve,
                                    understanding your strengths, and
                                    knowing what to revisit.
                                </p>
                            </div>

                            <div className="
                                border
                                border-[#24272B]
                                bg-gradient-to-br
                                from-[#16181B]
                                to-[#101214]
                                rounded-xl
                                p-6
                            ">

                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                ">

                                    <PreviewCard
                                        label="Questions"
                                        value="128"
                                    />

                                    <PreviewCard
                                        label="Solved"
                                        value="84"
                                    />

                                    <PreviewCard
                                        label="Favorites"
                                        value="17"
                                    />

                                    <PreviewCard
                                        label="Revision Due"
                                        value="6"
                                    />

                                </div>

                                <div className="
                                    mt-4
                                    border
                                    border-[#24272B]
                                    rounded-lg
                                    p-4
                                ">
                                    <p className="
                                        text-xs
                                        text-[#686A70]
                                        mb-3
                                    ">
                                        Preparation overview
                                    </p>

                                    <div className="space-y-3">
                                        <PreviewBar
                                            label="Easy"
                                            percentage="72%"
                                        />

                                        <PreviewBar
                                            label="Medium"
                                            percentage="58%"
                                        />

                                        <PreviewBar
                                            label="Hard"
                                            percentage="34%"
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* CTA */}
                    <section className="
                        border-t
                        border-[#24272B]
                    ">
                        <div className="
                            max-w-4xl
                            mx-auto
                            px-6
                            py-24
                            text-center
                        ">

                            <h2 className="
                                text-3xl
                                md:text-4xl
                                font-semibold
                                tracking-tight
                            ">
                                Build a preparation system
                                that works for you.
                            </h2>

                            <p className="
                                text-[#686A70]
                                mt-4
                            ">
                                Start organizing your interview preparation today.
                            </p>

                            <Link
                                to="/register"
                                className="
                                    inline-flex
                                    mt-8
                                    bg-[#F2F2F2]
                                    text-[#08090A]
                                    rounded-lg
                                    px-6
                                    py-3
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    hover:bg-white
                                    hover:-translate-y-0.5
                                "
                            >
                                Create your account →
                            </Link>

                        </div>
                    </section>

                </main>

                {/* Footer */}
                <footer className="
                    border-t
                    border-[#24272B]
                ">
                    <div className="
                        max-w-6xl
                        mx-auto
                        px-6
                        py-6
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        justify-between
                        gap-3
                    ">
                        <p className="
                            text-sm
                            text-[#686A70]
                        ">
                            O-No
                        </p>

                        <p className="
                            text-xs
                            text-[#4F5257]
                        ">
                            Built for interview preparation.
                        </p>
                    </div>
                </footer>

            </div>
        </PageTransition>
    );
}

function Feature({ title, description }) {
    return (
        <div className="
            bg-[#101214]
            p-6
            md:p-8
            transition-colors
            duration-200
            hover:bg-[#131518]
        ">
            <h3 className="
                text-base
                font-medium
                text-[#F2F2F2]
            ">
                {title}
            </h3>

            <p className="
                text-sm
                text-[#686A70]
                leading-6
                mt-3
            ">
                {description}
            </p>
        </div>
    );
}

function PreviewCard({ label, value }) {
    return (
        <div className="
            border
            border-[#24272B]
            rounded-lg
            p-4
        ">
            <p className="
                text-xs
                text-[#686A70]
            ">
                {label}
            </p>

            <p className="
                text-2xl
                font-semibold
                mt-2
            ">
                {value}
            </p>
        </div>
    );
}

function PreviewBar({ label, percentage }) {
    return (
        <div>
            <div className="
                flex
                justify-between
                text-xs
                mb-2
            ">
                <span className="text-[#A1A3A8]">
                    {label}
                </span>

                <span className="text-[#686A70]">
                    {percentage}
                </span>
            </div>

            <div className="
                h-1.5
                bg-[#24272B]
                rounded-full
                overflow-hidden
            ">
                <div
                    className="
                        h-full
                        bg-[#8A8D93]
                        rounded-full
                    "
                    style={{
                        width: percentage
                    }}
                />
            </div>
        </div>
    );
}

export default Landing;