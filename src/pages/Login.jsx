import React from "react"
import { useSignIn } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom"
import { Lock, Mail } from "lucide-react"

export default function Login() {
    const { signIn, isLoaded } = useSignIn()
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isLoaded) return

        try {
            const result = await signIn.create({
                identifier: formData.email,
                password: formData.password,
            })

            // ✅ ONLY proceed when complete
            if (result.status === "complete") {
                await signIn.setActive({
                    session: result.createdSessionId,
                })

                navigate("/app")
                return
            }

            // ❗ Other states (no error, just not done yet)
            console.log("Sign-in status:", result.status)

        } catch (err) {
            console.error(err)
            alert(err.errors?.[0]?.message || "Invalid email or password")
        }
    }


    const handleGoogleLogin = async () => {
        if (!isLoaded) return
        try {
            // Redirect to Clerk Google OAuth
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/app", // where to go after login
            })
        } catch (err) {
            console.error("Google sign-in error:", err)
        }
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-sm text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
                <p className="text-gray-500  mt-2">Please login to continue</p>

                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Mail className="text-[#6B7280] w-4" />
                    <input type="email" name="email" placeholder="Email id" className="  border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Lock className="text-[#6B7280] w-4" />
                    <input type="password" name="password" placeholder="Password" className=" border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-(--primary)">
                    <button className="cursor-pointer" type="reset">Forget password?</button>
                </div>
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white cursor-pointer  bg-(--primary) hover:opacity-90 transition-opacity">
                    Login
                </button>
                <p className="text-gray-500  mt-3">Don't have an account?<Link to='/register' className="text-(--primary) hover:underline"> click here</Link></p>
                <button onClick={handleGoogleLogin} type="button" class="w-full flex items-center gap-2 justify-center my-5 mb-10 cursor-pointer hover:bg-gray-100/70 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
                    <img class="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                    Log in with Google
                </button>
            </form>
        </section>
    )
}
