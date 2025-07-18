import React, { useState } from "react";
import "./navbar.css"
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [tooltip, setTooltip] = useState({ visible: false, text: "", position: { x: 0, y: 0 } });

 const icons =[
    {text: "Home" , icon: ( 
                <svg className="icon first-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 34 32" enable-background="new 0 0 34 32" xml:space="preserve" fill="#576B87"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#576B87" d="M5.24,18.179l2.974-2.486c0.212-0.177,0.24-0.493,0.063-0.705c-0.177-0.213-0.495-0.24-0.704-0.063 l-2.975,2.487c-0.92,0.769-2.229,0.722-2.979-0.106c-0.443-0.489-0.661-1.129-0.614-1.803c0.046-0.655,0.348-1.261,0.829-1.664 L17.006,1.152l15.077,12.609c0.9,0.752,1.181,2.066,0.652,3.056C32.34,17.558,31.636,18,30.853,18 c-0.482,0-0.938-0.169-1.321-0.488l-3.015-2.521c-0.209-0.177-0.524-0.149-0.704,0.062c-0.177,0.212-0.148,0.527,0.063,0.704 l3.015,2.522C29.455,18.751,30.133,19,30.853,19c1.159,0,2.192-0.64,2.766-1.713c0.746-1.398,0.361-3.244-0.895-4.294L17.326,0.116 c-0.186-0.155-0.455-0.155-0.641,0L1.194,13.072c-0.689,0.577-1.122,1.438-1.186,2.362c-0.065,0.934,0.252,1.861,0.869,2.543 C1.99,19.204,3.906,19.294,5.24,18.179z"></path> <path fill="#576B87" d="M5.5,20.5C5.224,20.5,5,20.724,5,21v9.5C5,31.327,5.673,32,6.5,32h21c0.827,0,1.5-0.673,1.5-1.5V21 c0-0.276-0.224-0.5-0.5-0.5S28,20.724,28,21v9.5c0,0.276-0.225,0.5-0.5,0.5h-21C6.225,31,6,30.776,6,30.5V21 C6,20.724,5.776,20.5,5.5,20.5z"></path> <path fill="#576B87" d="M20.5,25c0.827,0,1.5-0.673,1.5-1.5v-6c0-0.827-0.673-1.5-1.5-1.5h-6c-0.827,0-1.5,0.673-1.5,1.5v6 c0,0.827,0.673,1.5,1.5,1.5H20.5z M14,23.5v-6c0-0.276,0.225-0.5,0.5-0.5h6c0.275,0,0.5,0.224,0.5,0.5v6c0,0.276-0.225,0.5-0.5,0.5 h-6C14.225,24,14,23.776,14,23.5z"></path> </g> </g></svg>
           )},
           
      {text: "Search", icon: (
                 <svg className="icon extra-stroke" width="64px" height="64px" viewBox="0 0 64.00 64.00" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#576B87"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#576B87" stroke-width="0.768"></g><g id="SVGRepo_iconCarrier"><circle cx="28" cy="28" r="20"></circle><line x1="56" y1="56" x2="42.14" y2="42.14"></line></g></svg>
           )},
            
      {text: "Play", icon: ( 
                 <svg className="icon extra-stroke" width="64px" height="64px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#576B87"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="32" r="24"></circle><polyline points="28 40 36 32 28 24"></polyline></g></svg>
            )},
            
      {text: "Anime", icon: (
                <svg className="icon extra-stroke" 
                width="64px" 
                height="64px" 
                viewBox="0 0 48 48" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#576B87"
                >
                <g fill="none" stroke="#576B87" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="42.5" y1="40.0215" x2="24" y2="7.9785" />
                    <polygon points="20.3182 28.5302 13.6837 40.0215 26.9527 40.0215 20.3182 28.5302" />
                    <polyline points="35.1364 40.0215 20.3182 14.3556 5.5 40.0215" />
                </g>
            </svg>
            
            )},
            
      {text: "Settings", icon:(
                   <svg className="icon extra-stroke" width="64px" height="64px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#576B87"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M56 32a23.74 23.74 0 0 0-.32-3.89L48 25.37 51.5 18a24.41 24.41 0 0 0-5.5-5.5L38.63 16l-2.74-7.68a23.8 23.8 0 0 0-7.78 0L25.37 16 18 12.5a24.41 24.41 0 0 0-5.5 5.5l3.5 7.37-7.68 2.74a23.8 23.8 0 0 0 0 7.78L16 38.63 12.5 46a24.41 24.41 0 0 0 5.5 5.5l7.37-3.5 2.74 7.68a23.8 23.8 0 0 0 7.78 0L38.63 48 46 51.5a24.41 24.41 0 0 0 5.5-5.5L48 38.63l7.68-2.74A23.74 23.74 0 0 0 56 32z"></path><circle cx="32" cy="32" r="4"></circle></g></svg>
            
            )}
      
  ] 
  const showTooltip = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text,
      position: { x: rect.right + 10, y: rect.top + rect.height / 2 },
    });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, text: "", position: { x: 0, y: 0 } });
  };

  return (
    <div style={{ display: "flex", background: "transparent" }}>
      <div
        style={{
          width: "60px",
          height:"auto",
          background: "#000",
          color: "#87A2BE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          borderRadius:"10px",
          gap:"20px"
        }}
      >
        {icons.map((item, index) => {
          // const isHome =item.text.toLowerCase() === "Home" ? "/" : item.text.toLowerCase();
          const path = item.text.toLowerCase() === "home" ? "" : item.text.toLowerCase();
          return (
          <div
            key={index}
            onMouseEnter={(e) => showTooltip(e, item.text)}
            onMouseLeave={hideTooltip}
            style={{
              cursor: "pointer",
              padding:"0 10px"
              
              
              
            }}
          >
            <NavLink 
              to={`/${path}`}
              className={({ isActive }) => isActive ? "nav-active" : ""}
            >
            <span style={{ fontSize: "24px" }}>{item.icon}</span>
            </NavLink>
          </div>
)})}
      </div>

      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.position.x,
            top: tooltip.position.y,
            transform: "translateY(-50%)",
            background: "#2B2929",
            color: "#576B87",
            padding: "10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            fontSize: "14px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            opacity:"1  ",
            fontSize:"1rem",
            border:"0.5px solid black",
            
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
