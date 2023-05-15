const API = "https://easy-budget-api-silasoli.vercel.app";
import { useState } from "react";
export const login = async (loginForm) => {
  const bodyForm = JSON.stringify(loginForm);
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/auth/users`, config);
  const auth = await response.json();
  if (auth.statusCode) {
    let authorization = {
      auth: false,
      message: auth.message,
    };
    return authorization;
  } else {
    let authorization = true;
    localStorage.setItem("user_id", auth.id);
    localStorage.setItem("token", auth.access_token);
    return authorization;
  }
};
export const getAuth = () => {
  const user = localStorage.getItem("token");

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return { auth };
};
export const getProducts = async (category) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const auth = await fetch(
      `${API}/products/category?category=${category}`,
      config
    );
    const products = await auth.json();
    products.forEach((product) => {
      (product.name =
        product.name.charAt(0).toUpperCase() + product.name.slice(1)),
        (product.brand =
          product.brand.charAt(0).toUpperCase() + product.brand.slice(1)),
        (product.price = Number(product.price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }));
    });
    return products;
  }
};

export const formatText = (text) => {
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
};

export const formatPrice = (price) => {
  price = Number(price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
  });

  return price;
};

export const setProduct = async (product) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    };
    let result = await fetch(`${API}/products`, config);
    result = await result.json();
    return result;
  }
};
export const getProduct = async (id) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let result = await fetch(`${API}/products/${id}`, config);
    result = await result.json();
    return result;
  }
};

export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("token");

  if (token) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    };
    let result = await fetch(`${API}/products/${id}`, config);
    result = await result.json();
    return result;
  }
};

export const getProductsByOrc = async (category) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const auth = await fetch(
      `${API}/products/names?category=${category}`,
      config
    );
    const products = await auth.json();
    products.forEach((product) => {
      (product.name =
        product.name.charAt(0).toUpperCase() + product.name.slice(1)),
        (product.brand =
          product.brand.charAt(0).toUpperCase() + product.brand.slice(1)),
        (product.price = Number(product.price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }));
    });
    return products;
  }
};

export const getCustomersByName = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
     
    let result = await fetch(`${API}/customers/names`, config);
       result = await result.json();
    result.forEach((product) => {
      (product.name =
        product.name.charAt(0).toUpperCase() + product.name.slice(1))
    });
    return result;
  }
};
export const getUsersByName = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let result = await fetch(`${API}/users/names`, config);
    result = await result.json();
    result.forEach((product) => {
      product.name =
        product.name.charAt(0).toUpperCase() + product.name.slice(1);
    });
    return result;
  }
};

export const setBudget = async (budget) => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: budget,
    };

    let result = await fetch(`${API}/budgets`, config);
    result = await result.json();
    console.log('resultado do post: ', result);
    return result;
  }
};



// export const getCategories = async () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const config = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const auth = await fetch(`${API}/products`, config);
//     const categories = await auth.json();
//     return categories;
//   }
// };
// export const registerProduc = () => {
//   const config = {

//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//easybudgetech@gmail.com
//
//   const auth = fetch(`${API}/auth/users`, config);
//   return auth;
// };

// const token = JSON.parse(localStorage.getItem("token"));
// export const logOut = (loginForm) => {
//   const config = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: { loginForm },
//   };

//   const auth = fetch(`${API}/auth/users`, config);
//   localStorage.setItem("token", auth);
//   return auth;
// };
