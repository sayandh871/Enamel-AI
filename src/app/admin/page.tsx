export const dynamic = "force-dynamic";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AdminDashboardClient from "@/app/admin/AdminDashboardClient"



const AdminPage = async () => {

    const user = await currentUser()

    //user is not logged in
    if(!user) redirect("/");

    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = user.emailAddresses[0]?.emailAddress;

    //if user is not  the admin
    if(!adminEmail || userEmail !== adminEmail) redirect("/dashboard");

  return <AdminDashboardClient />
}

export default AdminPage
