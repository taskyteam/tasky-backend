
const households = [
  {
    id: 1,
    name: "Kråkereiret"
  },

  {
    id: 2,
    name: "Beverveien 10"
  }
]

const users = [
  {
    id: 1,
    username: "per73",
    password: "1234",
    household_id: 1,
    admin: true,
    email: "per@gmail.com"
  },
  {
    id: 2,
    username: "ida",
    password: "2222",
    household_id: 1,
    admin: false,
    email: "ida@gmail.com"
  },
  {
    id: 3,
    username: "geir12",
    password: "1111",
    household_id: 1,
    admin: false,
    email: "geir@gmail.com"
  },
  {
    id: 4,
    username: "pernille",
    password: "6767",
    household_id: 2,
    admin: true,
    email: "pernille@gmail.com"
  },
  {
    id: 5,
    username: "nils",
    password: "0000",
    household_id: 2,
    admin: false,
    email: "nils@gmail.com"
  },
  {
    id: 6,
    username: "lise",
    password: "4321",
    household_id: 2,
    admin: false,
    email: "lise@gmail.com"
  }
]

const tasks = [
  {
    id: 1,
    household_id: 1,
    title: "vaske postkassen",
    desc: "",
    assigned_to: 2,
    points: 100,
    status: "open",
    repeatable: false
  },
  {
    id: 2,
    household_id: 1,
    title: "tømme oppvaskmaskinen",
    desc: "",
    assigned_to: 3,
    points: 20,
    status: "open",
    repeatable: false
  },
  {
    id: 3,
    household_id: 2,
    title: "rydde rommet",
    desc: "",
    assigned_to: 5,
    points: 50,
    status: "open",
    repeatable: false
  },
  {
    id: 4,
    household_id: 2,
    title: "mate fiskene",
    desc: "",
    assigned_to: 6,
    points: 10,
    status: "open",
    repeatable: false
  }
]


module.exports = {
  households,
  users,
  tasks
}