function useSaveToken() {
  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  return saveToken;
}

export default useSaveToken;
