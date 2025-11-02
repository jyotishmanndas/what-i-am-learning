import React from 'react'
import Card from './components/Card'

let data = [
  {
    logo: "https://imgs.search.brave.com/FpnyRNRoovwDAwTfn4Un-es4uQ_6nByUIFalpA3R9EE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAwMTg2/MC8xNjM3NS9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzE2Mzc1NzYz/Mi1zdG9jay1waG90/by1hbWF6b24tbG9n/by1vbi1hLXdoaXRl/LmpwZw",
    cname: "Amazon",
    postday: 5,
    title: "Senior UI/UX Designer",
    tag1: "Part-Time",
    tag2: "Senior Level",
    price: 120,
    loc: "Mumbai, India"
  },
  {
    logo: "https://imgs.search.brave.com/mOprMKN9pXAJPa2Zht_8FPYuhPxE8HjnA8qmc7Ou15o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGV6ZWVuLmNv/bS91cGxvYWRzLzIw/MjUvMDUvc3EtZ29v/Z2xlLWctbG9nby11/cGRhdGVfZGV6ZWVu/XzIzNjRfY29sXzAt/ODUyeDg1Mi5qcGc",
    cname: "Google",
    postday: 2,
    title: "Full-Stack Developer",
    tag1: "Full-Time",
    tag2: "Mid-Level",
    price: 150,
    loc: "Bengaluru, India"
  },
  {
    logo: "https://imgs.search.brave.com/m7NfdzL50Vg_jv9ZiPrsSTIEUZSW_pF374aGfqUtm7Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE1L2Nm/LzdmLzE1Y2Y3ZjY1/ZDU2ZThmY2YxNmZh/MDhlNDVjZWFlODFk/LmpwZw",
    cname: "Microsoft",
    postday: 10,
    title: "Product Manager",
    tag1: "Full-Time",
    tag2: "Senior Level",
    price: 180,
    loc: "Hyderabad, India"
  },
  {
    logo: "https://imgs.search.brave.com/kuInYCg_eL2AKYnGgq6W9VOJQBF_17KB3N3R_wJQ0Eg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy82/Mjk3NjRiODdlYzc2/YjgyZmIyMWZjZTQu/cG5n",
    cname: "Netflix",
    postday: 7,
    title: "Backend Engineer",
    tag1: "Contract",
    tag2: "Senior Level",
    price: 200,
    loc: "San Francisco, USA"
  },
  {
    logo: "https://imgs.search.brave.com/n2xcoy_PMh729sXycpz5-cCM8l98Hdya2BMy5N-Yv4Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9TcG90aWZ5/L1Nwb3RpZnktSWNv/bi1Mb2dvLndpbmUu/c3Zn",
    cname: "Spotify",
    postday: 1,
    title: "Frontend Developer",
    tag1: "Full-Time",
    tag2: "Junior Level",
    price: 90,
    loc: "New York, USA"
  },
  {
    logo: "https://imgs.search.brave.com/Ot9xO5w8UuZMlTJqxSTzbFYe6Z5t8KQ6x-HWm4wwY54/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LmxvZ29tYXN0ZXIu/YWkvaHMtZnMvaHVi/ZnMvYWRvYmUtbG9n/by0xOTkzLmpwZz93/aWR0aD02NjImaGVp/Z2h0PTQ0NyZuYW1l/PWFkb2JlLWxvZ28t/MTk5My5qcGc",
    cname: "Adobe",
    postday: 15,
    title: "Data Scientist",
    tag1: "Full-Time",
    tag2: "Lead",
    price: 220,
    loc: "Noida, India"
  },
  {
    logo: "https://imgs.search.brave.com/K_rdupfY-avtJCVbJr24P6KCgv9PQ9PZxgPoXVBpsaY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMi8w/NS8yNi8wMi80Mi9t/ZXRhLTcyMjE3MzRf/NjQwLnBuZw",
    cname: "Meta",
    postday: 21,
    title: "DevOps Engineer",
    tag1: "Part-Time",
    tag2: "Mid-Level",
    price: 130,
    loc: "London, UK"
  },
  {
    logo: "https://imgs.search.brave.com/FpnyRNRoovwDAwTfn4Un-es4uQ_6nByUIFalpA3R9EE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAwMTg2/MC8xNjM3NS9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzE2Mzc1NzYz/Mi1zdG9jay1waG90/by1hbWF6b24tbG9n/by1vbi1hLXdoaXRl/LmpwZw",
    cname: "Amazon",
    postday: 5,
    title: "Senior UI/UX Designer",
    tag1: "Part-Time",
    tag2: "Senior Level",
    price: 120,
    loc: "Mumbai, India"
  },
  {
    logo: "https://imgs.search.brave.com/mOprMKN9pXAJPa2Zht_8FPYuhPxE8HjnA8qmc7Ou15o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGV6ZWVuLmNv/bS91cGxvYWRzLzIw/MjUvMDUvc3EtZ29v/Z2xlLWctbG9nby11/cGRhdGVfZGV6ZWVu/XzIzNjRfY29sXzAt/ODUyeDg1Mi5qcGc",
    cname: "Google",
    postday: 2,
    title: "Full-Stack Developer",
    tag1: "Full-Time",
    tag2: "Mid-Level",
    price: 150,
    loc: "Bengaluru, India"
  },
  {
    logo: "https://imgs.search.brave.com/m7NfdzL50Vg_jv9ZiPrsSTIEUZSW_pF374aGfqUtm7Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE1L2Nm/LzdmLzE1Y2Y3ZjY1/ZDU2ZThmY2YxNmZh/MDhlNDVjZWFlODFk/LmpwZw",
    cname: "Microsoft",
    postday: 10,
    title: "Product Manager",
    tag1: "Full-Time",
    tag2: "Senior Level",
    price: 180,
    loc: "Hyderabad, India"
  }
];

const App = () => {
  return (
    <div className='parent'>
      <Card data={data} />
    </div>
  )
}

export default App
