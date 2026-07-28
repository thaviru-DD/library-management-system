'use client';

import Box from '@mui/material/Box';

const systemStatuses = [
  { id: 1, label: 'System Status', description: 'Operational, fully connected', online: true },
  { id: 2, label: 'System Status', description: 'Backup service', online: false },
];

export default function SystemStatus() {
  return (
    <Box>
      <div className='bg-white shadow-lg rounded-xl p-5 h-full'>
        <h1 className='text-2xl font-bold mb-5'>System Status</h1>

        <div className='flex flex-col gap-4'>
          {systemStatuses.map((status) => (
            <div key={status.id} className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <span className='font-medium'>{status.label}</span>
                <span className='text-sm text-gray-500'>{status.description}</span>
              </div>
              <span
                className={`w-3 h-3 rounded-full ${
                  status.online ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}