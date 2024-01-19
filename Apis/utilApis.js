const getRandomUser = async () => {
    try {
      const response = await fetch('https://random-data-api.com/api/v2/users?size=2');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  export {getRandomUser}