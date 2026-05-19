import Sidebar from "../shared/layout/Sidebar";
import Navbar from "../shared/layout/Navbar";

export default function MainLayout({ children }) {

    return (
        <div style={{display: 'flex'}}>
            <Sidebar />

            <div style={{ flex: 1 }}>
                <Navbar />

                <div style={{ padding: '20px' }}>
                                {children}
                </div>

            </div>
        </div>

    )
}