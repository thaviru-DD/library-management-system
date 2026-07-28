'use client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const recentActivity = [
  { id: 1, name: 'Samith Gomaz', role: 'Librarian', avatar: '/avatars/amelie.jpg' },
  { id: 2, name: 'Thaviru De Silva', role: 'Librarian', avatar: '/avatars/amelie.jpg' },
  { id: 3, name: 'Uvini Ayathma', role: 'Librarian', avatar: '/avatars/amelie.jpg' },
];

export default function RecentUserActivity() {
  return (
    <Box>
      <div className='bg-white shadow-lg rounded-xl p-5'>
        <h1 className='text-2xl font-bold mb-5'>Recent User Activity</h1>

        <div className='flex flex-col gap-3'>

          {/* Header row */}
          <div className='flex items-center bg-gray-100 p-3 rounded-lg'>
            <h3 className='flex-1 font-bold'>Recent User</h3>
            <h3 className='w-32 text-center font-bold'>Role</h3>
            <h3 className='w-32 text-center font-bold'>Actions</h3>
          </div>

          {/* Data rows */}
          {recentActivity.map((user, index) => (
            <div key={user.id}>
              <div className='flex items-center p-3'>
                <div className='flex items-center gap-3 flex-1'>
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 36, height: 36 }} />
                  <div className='flex flex-col'>
                    <span className='font-medium'>{user.name}</span>
                    <span className='text-sm text-gray-500'>{user.role}</span>
                  </div>
                </div>
                <h3 className='w-32 text-center'>{user.role}</h3>
                <div className='w-32 flex justify-center'>
                  <button className='text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50 transition-colors'>
                    Reserve Status
                  </button>
                </div>
              </div>
              {index < recentActivity.length - 1 && <hr />}
            </div>
          ))}

        </div>
      </div>
    </Box>
  );
}