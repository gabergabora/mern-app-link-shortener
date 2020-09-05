import React from 'react'

const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Сcылка</h2>

      <p>Ваша ссылка: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Кол-во кликов: <strong>{link.clicks}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    {/* <p>Удалить <strong>{delete}</strong></p> */}

    </>
  );
}

export default LinkCard