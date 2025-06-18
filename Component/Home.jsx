import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './home.css'

const Home = () => {
  return (
    <div className='mcard'>
    <Card >
      <Card.Img variant="top" src="https://www.topgear.com/sites/default/files/news-listicle/image/2023/09/LEAD.jpg?w=424&h=239" />
      <Card.Body>
        <Card.Title className='title'>Cars</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button>Know More</Button>
      </Card.Body>
    </Card>
    <Card >
      <Card.Img variant="top" src="https://media.istockphoto.com/id/477754371/photo/pool-and-modern-home-exterior.jpg?s=612x612&w=0&k=20&c=26KJRR5AdNvgGtlttzsnM3R8oz_-kiyuXwJ-mHFhMi8=" />
      <Card.Body>
        <Card.Title className='title'>Houses</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button>Know More</Button>
      </Card.Body>
    </Card>
    <Card >
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1615812595024-43ac7a9c0586?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVjYXRpfGVufDB8fDB8fHww" />
      <Card.Body>
        <Card.Title className='title'>Bikes</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button>Know More</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Home