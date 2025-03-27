import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import { Timestamp, setDoc, doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // ✅ Email/Password Signup
  const signup = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        uid: users.user.uid,
        name,
        email: users.user.email,
        role: "user",
        time: Timestamp.now(),
      };

      // ✅ Store in Firestore using setDoc (avoids duplicates)
      await setDoc(doc(fireDB, "users", user.uid), user, { merge: true });

      // ✅ Store user details in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Signup Successful!");
      navigate("/");
    } catch (error) {
      
      toast.error(error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Signup
  const googleSignup = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Check if user already exists in Firestore
      const userRef = doc(fireDB, "users", user.uid);
      const userSnap = await getDoc(userRef);
      let userData;

      if (userSnap.exists()) {
        // ✅ Existing user, fetch Firestore data
        userData = userSnap.data();
      } else {
        // ✅ New user, save to Firestore
        userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
          role: "user",
          time: Timestamp.now(),
        };
        await setDoc(userRef, userData);
      }

      // ✅ Store user details in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Google Signup Successful!");
      navigate("/");
    } catch (error) {
     
      toast.error(error.message || "Google Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen ">
        {loading && <Loader />}
        <div className="login_Form bg-gray-800 px-8 py-6 border border-black-100 rounded-xl shadow-md">
          <h1 className="text-center text-2xl font-bold text-white p-3">Signup</h1>

          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black-50 border border-black-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black-200"
              placeholder="Name"
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black-50 border border-black-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black-200"
              placeholder="Email"
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
              onClick={signup}
              className="w-full py-2 font-bold rounded-md transition duration-300 
               bg-blue-500 text-white hover:bg-blue-600 focus:outline-none 
               focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Signup
            </button>
          </div>

          <div className="mb-5">
            <button
              onClick={googleSignup}
              className="bg-white hover:bg-white w-full text-white text-center py-2 font-bold rounded-md"
            >
              <img src="/images/google.png" alt="" className="w-10 h-10 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" />
            </button>
          </div>

          <div>
            <h2 className="text-white">
              Have an account?{" "}
              <Link className="text-black-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
