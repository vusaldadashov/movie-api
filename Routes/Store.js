const express = require('express')
const router = express.Router()
const axios = require('axios')
const movies = [
    { id: '1',  title: 'Delta Bravo', year: '2020', type: ['Action'],                      rating: '5', imageUrl: '/img1.jpg', src: "https://www.youtube-nocookie.com/embed/AHmCH7iB_IM?start=1" },
    { id: '2',  title: 'Delta Bravo', year: '2020', type: ['Comedy', 'Mystery'],           rating: '5', imageUrl: '/img2.jpg', src: "https://www.youtube-nocookie.com/embed/eyAzL06eInI" },
    { id: '3',  title: 'Delta Bravo', year: '2020', type: ['Mystery', 'Adventure'],        rating: '8', imageUrl: '/img3.jpg' },
    { id: '4',  title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img4.jpg' },
    { id: '5',  title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img5.jpg' },
    { id: '6',  title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img6.jpg' },
    { id: '7',  title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img7.jpg' },
    { id: '8',  title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img8.jpg' },
    { id: '9',  title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '6', imageUrl: '/img9.jpg' },
    { id: '10', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '7', imageUrl: '/img10.jpg' },
    { id: '11', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '8', imageUrl: '/img11.jpg' },
    { id: '12', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '9', imageUrl: '/img12.jpg' },
    { id: '13', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '10', imageUrl: '/img1.jpg' },
    { id: '14', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img2.jpg' },
    { id: '15', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img3.jpg' },
    { id: '16', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img4.jpg' },
    { id: '17', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img5.jpg' },
    { id: '18', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img6.jpg' },
    { id: '19', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img7.jpg' },
    { id: '20', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img8.jpg' },
    { id: '21', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img9.jpg' },
    { id: '22', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img10.jpg' },
    { id: '23', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img11.jpg' },
    { id: '24', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img12.jpg' },
    { id: '25', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img1.jpg' },
    { id: '26', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img2.jpg' },
    { id: '27', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img3.jpg' },
    { id: '28', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img4.jpg' },
    { id: '29', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img5.jpg' },
    { id: '30', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img6.jpg' },
    { id: '31', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img7.jpg' },
    { id: '32', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img8.jpg' },
    { id: '33', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img9.jpg' },
    { id: '34', title: 'Delta Bravo', year: '2008', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img10.jpg' },
    { id: '35', title: 'Delta Bravo', year: '2009', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img11.jpg' },
    { id: '36', title: 'Delta Bravo', year: '2010', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img12.jpg' },
    { id: '37', title: 'Delta Bravo', year: '2011', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img1.jpg' },
    { id: '38', title: 'Delta Bravo', year: '2012', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img2.jpg' },
    { id: '39', title: 'Delta Bravo', year: '2013', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img3.jpg' },
    { id: '40', title: 'Delta Bravo', year: '2014', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img4.jpg' },
    { id: '41', title: 'Delta Bravo', year: '2015', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img5.jpg' },
    { id: '42', title: 'Delta Bravo', year: '2016', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img6.jpg' },
    { id: '43', title: 'Delta Bravo', year: '2017', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img7.jpg' },
    { id: '44', title: 'Delta Bravo', year: '2018', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img8.jpg' },
    { id: '45', title: 'Delta Bravo', year: '2019', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img9.jpg' },
    { id: '46', title: 'Delta Bravo', year: '2021', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img10.jpg' },
    { id: '47', title: 'Delta Bravo', year: '2022', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img11.jpg' },
    { id: '48', title: 'Delta Bravo', year: '2023', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/img12.jpg' }
  ]

  const shows = [
    { id: '1',  title: 'A', year: '2020', type: ['Action'],                      rating: '5', imageUrl: '/show1.jpg' },
    { id: '2',  title: 'B', year: '2020', type: ['Comedy', 'Mystery'],           rating: '5', imageUrl: '/show2.jpg' },
    { id: '3',  title: 'C', year: '2020', type: ['Mystery', 'Adventure'],        rating: '8', imageUrl: '/show3.jpg' },
    { id: '4',  title: 'D', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show4.jpg' },
    { id: '5',  title: 'E', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '6',  title: 'F', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' },
    { id: '7',  title: 'G', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show7.jpg' },
    { id: '8',  title: 'H', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show8.jpg' },
    { id: '9',  title: 'I', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '6', imageUrl: '/show9.jpg' },
    { id: '10', title: 'L', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '7', imageUrl: '/show10.jpg' },
    { id: '11', title: 'M', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '8', imageUrl: '/show5.jpg' },
    { id: '12', title: 'N', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '9', imageUrl: '/show6.jpg' },
    { id: '13', title: 'S', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '10', imageUrl: '/show1.jpg' },
    { id: '14', title: 'Q', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show2.jpg' },
    { id: '15', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show3.jpg' },
    { id: '16', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show4.jpg' },
    { id: '17', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '18', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' },
    { id: '19', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show7.jpg' },
    { id: '20', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show8.jpg' },
    { id: '21', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show9.jpg' },
    { id: '22', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show10.jpg' },
    { id: '23', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '24', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' },
    { id: '25', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show1.jpg' },
    { id: '26', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show2.jpg' },
    { id: '27', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show3.jpg' },
    { id: '28', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show4.jpg' },
    { id: '29', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '30', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' },
    { id: '31', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show7.jpg' },
    { id: '32', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show8.jpg' },
    { id: '33', title: 'Delta Bravo', year: '2020', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show9.jpg' },
    { id: '34', title: 'Delta Bravo', year: '2008', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show10.jpg' },
    { id: '35', title: 'Delta Bravo', year: '2009', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '36', title: 'Delta Bravo', year: '2010', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' },
    { id: '37', title: 'Delta Bravo', year: '2011', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show1.jpg' },
    { id: '38', title: 'Delta Bravo', year: '2012', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show2.jpg' },
    { id: '39', title: 'Delta Bravo', year: '2013', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show3.jpg' },
    { id: '40', title: 'Delta Bravo', year: '2014', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show4.jpg' },
    { id: '41', title: 'Delta Bravo', year: '2015', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '42', title: 'Delta Bravo', year: '2016', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' },
    { id: '43', title: 'Delta Bravo', year: '2017', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show7.jpg' },
    { id: '44', title: 'Delta Bravo', year: '2018', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show8.jpg' },
    { id: '45', title: 'Delta Bravo', year: '2019', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show9.jpg' },
    { id: '46', title: 'Delta Bravo', year: '2021', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show10.jpg' },
    { id: '47', title: 'Delta Bravo', year: '2022', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show5.jpg' },
    { id: '48', title: 'Delta Bravo', year: '2023', type: ['Action', 'Comedy', 'Mystery'], rating: '5', imageUrl: '/show6.jpg' }
  ]


router.get('/getmovies', (req,res) => {
  res.send(movies)
    console.log("data sended")
})

router.get('/getshows', (req,res) => {
  res.send(shows)
  console.log("data sended")
})

router.get('/getmovie', (req,res) => {
    const {movieId} = req.query
    const movie = movies.filter(x=> x.id === movieId)
    res.send(movie[0])
})




module.exports = router