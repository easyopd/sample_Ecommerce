import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import { Timestamp, setDoc, doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

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
            console.error("Signup Error:", error);
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
            console.error("Google Signup Error:", error);
            toast.error(error.message || "Google Signup failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="bg-gray-800 px-10 py-10 rounded-xl">
                <h1 className="text-center text-white text-xl mb-4 font-bold">Signup</h1>
                
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                    placeholder="Password"
                />

                <button onClick={signup} className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg">
                    Signup
                </button>

                <button onClick={googleSignup} className="bg-red-500 w-full text-white font-bold px-2 py-2 mt-3 rounded-lg">
                    Signup with Google
                </button>

                <h2 className="text-white mt-3">
                    Have an account?{" "}
                    <Link className="text-yellow-500 font-bold" to={"/login"}>
                        Login
                    </Link>
                </h2>
            </div>
        </div>
    );
}

export default Signup;
