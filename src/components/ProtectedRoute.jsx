import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, allowedRole }) {
    const { session } = useAuth();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && session.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}
