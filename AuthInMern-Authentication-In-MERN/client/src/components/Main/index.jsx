import styles from "./styles.module.css";
import WebCom from "../WebCom"
import ScreenRecorder from "../../ScreenRecorder";
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>My Recorder</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			 
			<ScreenRecorder/>
		</div>
	);
};

export default Main;
