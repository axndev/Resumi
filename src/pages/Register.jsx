import React from "react"
import { useSignUp } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import { Lock, Mail, User } from "lucide-react"

export default function Register() {
  const { signUp, isLoaded } = useSignUp()
  const navigate = useNavigate()

  const handleGoogleRegister = async () => {
    if (!isLoaded) return

    try {
      // This will start Google OAuth and create a new user if needed
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/app",
      })
    } catch (err) {
      console.error("Google login ero error:", err)
    }
  }

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-sm text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Sign up</h1>
        <p className="text-gray-500  mt-2">Please register to continue</p>

        <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <User className="text-[#6B7280] w-4" />
          <input type="text" name="name" placeholder="Name" className="  border-none outline-none ring-0" value={formData.name}  required />
        </div>
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail className="text-[#6B7280] w-4" />
          <input type="email" name="email" placeholder="Email id" className="  border-none outline-none ring-0" value={formData.email}  required />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock className="text-[#6B7280] w-4" />
          <input type="password" name="password" placeholder="Password" className=" border-none outline-none ring-0" value={formData.password}  required />
        </div>
        <button type="submit" className="mt-4 w-full h-11 rounded-full text-white cursor-pointer  bg-(--primary) hover:opacity-90 transition-opacity">
          Sign up
        </button>
        <p className="text-gray-500  mt-4">Already have an account? <Link to='/login' className="text-(--primary) hover:underline">click here</Link></p>
        <button onClick={handleGoogleRegister} type="button" class="w-full flex items-center gap-2 justify-center my-5 mb-10 cursor-pointer hover:bg-gray-100/70 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
          <img class="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
          Sign up in with Google
        </button>
      </form>
    </section>
  )
}
