import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await login(email, password);
			toast.success("Login successful!");
			navigate("/profile");
		} catch (err) {
			const errorMessage =
				err?.response?.data?.message ||
				"Failed to log in. Please check your credentials.";
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black text-white d-flex flex-column">
			<div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-4">
				<div className="auth-card-container animate-fade-down">
					<div className="text-center mb-4">
						<h1 className="gradient-title mb-2">echo</h1>
						<p className="text-secondary">
							Where moments fade, memories remain
						</p>
					</div>

					<div className="space-y-6">
						<Form onSubmit={handleSubmit} className="space-y-4">
							<Form.Group className="mb-3">
								<Form.Label className="text-secondary">Email</Form.Label>
								<Form.Control
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="custom-input"
									placeholder="you@example.com"
								/>
							</Form.Group>

							<Form.Group className="mb-4">
								<div className="d-flex justify-content-between align-items-center">
									<Form.Label className="text-secondary">Password</Form.Label>
									<Link to="/forgot-password" className="forgot-password-link">
										Forgot password?
									</Link>
								</div>
								<Form.Control
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="custom-input"
									placeholder="••••••••"
								/>
							</Form.Group>

							<Button
								type="submit"
								className="w-100 gradient-button"
								disabled={loading}
							>
								{loading ? "Logging in..." : "Sign in"}
							</Button>
						</Form>

						<div className="divider"></div>
						<p className="text-center mt-4 text-secondary">
							Don't have an account?{" "}
							<Link to="/register" className="signup-link">
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>

			<footer className="py-3 text-center text-secondary">
				© 2025 Echo. All rights reserved.
			</footer>
		</div>
	);
};

export default Login;
