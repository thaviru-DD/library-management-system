const recentActivity = [
  { id: 1, name: 'Amélie Laurent', role: 'Librarian', avatar: null },
  { id: 2, name: 'Davis Workman', role: 'Librarian', avatar: null },
  { id: 3, name: 'Thaviru Perera', role: 'Member', avatar: null },
];

export default function RecentUserActivity() {
  return (
    <div className='bg-white shadow-sm border border-gray-100 rounded-2xl p-6 h-full'>
      <h2 className='text-lg font-bold text-[#41431B] mb-4'>Recent User Activity</h2>

      <div className='flex flex-col'>
        {recentActivity.map((user, index) => (
          <div key={user.id}>
            <div className='flex items-center py-3'>
              <div className='w-9 h-9 rounded-full bg-[#E3DBBB] text-[#41431B] flex items-center justify-center font-semibold text-sm shrink-0'>
                {user.name.charAt(0)}
              </div>

              <div className='ml-3 flex-1 min-w-0'>
                <p className='font-medium text-sm truncate'>{user.name}</p>
                <p className='text-xs text-gray-500'>{user.role}</p>
              </div>

              <button className='text-xs border border-gray-200 rounded-md px-3 py-1 text-gray-600 hover:bg-[#F8F3E1] hover:border-[#E3DBBB] transition-colors shrink-0'>
                View
              </button>
            </div>
            {index < recentActivity.length - 1 && <hr className='border-gray-100' />}
          </div>
        ))}
      </div>
    </div>
  );
}