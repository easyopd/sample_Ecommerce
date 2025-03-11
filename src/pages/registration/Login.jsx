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
      <div className={"login_Form bg-gray-800 px-8 py-6 border border-dark-100 rounded-xl shadow-md ${mode === 'dark' ? 'text-white' : 'text-black'}"}>

        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-white">
            Login
          </h2>
        </div>

        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black-50 border border-black-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black-200"
            placeholder="Email Address"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black-50 border border-black-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black-200"
            placeholder="Password"
          />
        </div>

        <div className="mb-5">
          <button
            onClick={loginWithEmail}
            className="bg-black-500 hover:bg-black-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Login
          </button>
        </div>

        <div className="mb-5">
          <button
            onClick={loginWithGoogle}
            className="bg-white hover:bg-white w-full text-white text-center py-2 font-bold rounded-md"
          >
           <img src="/images/google.png" alt="" className="w-10 h-10 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"/>

          </button>
        </div>

        <div>
          <h2 className="text-white">
            Don't have an account?{" "}
            <Link className="text-black-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>

      </div>
    </div>
  );
}

export default Login;
