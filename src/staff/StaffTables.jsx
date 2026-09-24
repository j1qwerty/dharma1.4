// Staff → Bookings / Inquiries: same reference tables as the super-admin
// console (filters, search, booking drawer with status workflow) plus
// clickable sorting, month/year + from–to date filters, and pagination.
import { AdminBookings, AdminInquiries } from "../admin/pages/AdminTables";

export function StaffBookings() {
  return <AdminBookings sortable paginated dateFilter pageSize={20} />;
}

export function StaffInquiries() {
  return <AdminInquiries sortable paginated dateFilter pageSize={20} />;
}
