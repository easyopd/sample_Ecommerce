import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB, googleProvider } from "../../fireabase/FirebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { query, collection, where, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ Email/Password Login Function
  const loginWithEmail = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // ✅ Fetch user data from Firestore
      const q = query(collection(fireDB, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);

      if (!docs.empty) {
        const userData = docs.docs[0].data();
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        toast.error("User not found in Firestore.");
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid email or password!");
    }
    setLoading(false);
  };

  // ✅ Google Login Function
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // ✅ Check if user exists in Firestore
      const q = query(collection(fireDB, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);

      let userData;

      if (docs.empty) {
        // ✅ New Google User - Save to Firestore
        userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(), // ✅ Use Firestore timestamp
        };

        await setDoc(doc(fireDB, "users", user.uid), userData);
      } else {
        userData = docs.docs[0].data(); // ✅ Existing user data
      }

      // ✅ Store correct user details
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed!");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder-gray-200 outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder-gray-200 outline-none"
          placeholder="Password"
        />

        <button
          onClick={loginWithEmail}
          className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg mb-3"
        >
          Login
        </button>

        {/* ✅ Google Login Button */}
        <button
          onClick={loginWithGoogle}
          className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg mb-3"
        >
          Login with Google
        </button>

        <h2 className="text-white">
          Don't have an account?{" "}
          <Link className="text-yellow-500 font-bold" to={"/signup"}>
            Signup
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Login;
