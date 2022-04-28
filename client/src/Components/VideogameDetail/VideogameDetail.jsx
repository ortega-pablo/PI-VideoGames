import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams , useNavigate } from "react-router-dom";
import { deleteVideogame, getDetail } from "../../redux/actions";
import sty from "./VideogameDetail.module.css";

export default function VideogameDetail(props) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const myVideogame = useSelector((state) => state.detail);
  
  const deleteVg = ()=>{
    if(window.confirm("Would you like to delete this videogame?")=== true){
        dispatch(deleteVideogame(id))
        alert("Videogame removed")
        navigate("/home")
    }
    else{
        alert("Canceled")
    }
}

  return (
    <div>
      {myVideogame.length > 0 ? (
        <div className={sty.container}>

          <div className={sty.left}>
            <img src={myVideogame[0].background_image} className={sty.img} />
          </div>

          <div className={sty.right}>

            <div className={sty.name}>
              <h1>{myVideogame[0].name}</h1>
            </div>
            
            <div className={sty.description}>
            <p>{myVideogame[0].description.replace(/<[^>]*>?/g, "")}</p>
            </div>
            
            <div className={sty.released}>
              <h3 className={sty.titleFont}>Released:</h3> <h3>{myVideogame[0].released}</h3>
            </div>
            
            <div className={sty.rating}>
              <h3 className={sty.titleFont}>Rating: </h3><h3>{myVideogame[0].rating}</h3>
            </div>
            
            <div>
              <div className={sty.title}>
                <h3 className={sty.titleFont}>Genres:</h3>
              </div> 
              <div className={sty.elements}>
                {myVideogame[0].genres.map((genre) => (
                  <h4 key={genre.name}>{genre.name}</h4>
                ))}
              </div>
            </div>
            
            <div>
              <div className={sty.title}>
                <h3 className={sty.titleFont}>Platforms:</h3>
              </div> 
              <div className={sty.elements}>
                {myVideogame[0].platforms.map((platform) => (
                  <h4 key={platform.name}>{platform.name}</h4>
                ))}
            
            </div>
            </div>
            
          </div>
          {console.log(myVideogame)}
      {(myVideogame[0].isDataBase === "true") && <button className={sty.btn} onClick={deleteVg}>x</button> }
        </div>
        
      ) : (
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      )}
       
      
      <Link to="/home">
        <button className={sty.btn}>Return</button>
      </Link>
      
    
    </div>
  );
}
