export const state = () => ({
  user: {
    id: 1,
    email: 'booba@gmail.com',
    firstname: 'Booba',
    lastname: 'Elef',
    dateOfBirth: '25 Aout 2018',
    homeTown: 'Paris',
    country: 'France',
    credo: 'Life is like a meatball, all you have to do is enjoy it.',
    avatar: '/booba.jpeg',

    garage: [
      {
        id: 'tipo33',
        heroImage: '/tipo33/7.jpg',
        make: 'Alfa Romeo',
        model: 'Tipo 33',
        year_start: '1967'
      },
      {
        id: '507',
        heroImage: '/507/1.jpg',
        make: 'BMW',
        model: '507',
        year_start: '1956',
        year_stop: '1959'
      }
    ],
    favorites: [
      {
        id: '507',
        heroImage: '/507/1.jpg',
        make: 'BMW',
        model: '507',
        year_start: '1956',
        year_stop: '1959'
      },
      {
        id: 'tipo33',
        heroImage: '/tipo33/7.jpg',
        make: 'Alfa Romeo',
        model: 'Tipo 33',
        year_start: '1967'
      }
    ],
    mediaLibrary: {}
  }
})

export const getters = {
  displayName(state) {
    return `${state.user.firstname} ${state.user.lastname}`
  }
}
