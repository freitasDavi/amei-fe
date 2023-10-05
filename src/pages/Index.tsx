import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


export function IndexPage() {
    return (
        <div className="flex gap-4">
            <Button>
                <Link to="/home">Home</Link>
            </Button>
            <Button>
                <Link to="/login">Login</Link>
            </Button>
        </div>
    )
}