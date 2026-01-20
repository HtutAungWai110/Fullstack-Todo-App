import SignupForm from "@/components/signupForm"

export default function Signup(){
    return (
        <>
            <main>
                <section>
                    <div className="center border-[1px] rounded-4xl overflow-hidden sm:w-[500px] w-[90%]">
                        <div className="banner-background text-white text-center p-[20px]">
                            <h2>Welcome to Todo app</h2>
                        </div>

                         <p className="text-center font-semibold m-[20px] sm:text-2xl text-[1.2em] text-green-900">Signup</p>
                        
                        <SignupForm/>
                    </div>
                </section>
            </main>
        </>
    )
}