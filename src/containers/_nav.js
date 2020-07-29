export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      /* MY ITEMS */
      {
        _name: 'CSidebarNavTitle',
        _children: ['Menu']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Alunos',
        to: '/students',
        icon: 'cil-user'
      },      
      {
        _name: 'CSidebarNavItem',
        name: 'Cursos',
        to: '/courses',
        icon: 'cil-layers'
      },      
      {
        _name: 'CSidebarNavItem',
        name: 'Matrículas',
        to: '/registrations',
        icon: 'cil-pencil'
      },
      /* ----------------------- */
    ]
  }
]