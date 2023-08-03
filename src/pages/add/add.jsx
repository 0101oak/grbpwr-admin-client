import React from 'react'
import './add.css'

const Add = () => {
  return (
    <div className='admin-wrapper'>
      <div className='title'>
        <h2>grb admin panel</h2>
      </div>
      <form action="">
        <div className='input-title'>
          <h2>main image</h2>
          <div className='input'>
            <input type="file" accept='image/*' className='content' />
          </div>
        </div>
        <div className='input-title'>
          <h2>imageURLs</h2>
          <div className='input'>
            <input type="file" accept='image/*' className='content' />
          </div>
        </div>
        <div className='input-title'>
          <h2>name</h2>
            <div className='input-cont'>
              <input type="text" className='cont' />
            </div>
        </div>
        <div className='price-title'>
          <div className='price-title_text'>
            <h2>price</h2>
          </div>
          <div className='currency-wrapper'>
            <div className='currency'>
              <label htmlFor="usd">
                <p className='cur'>USD</p>
              </label>
              <input type="number" name='usd' className='price' />
            </div>
            <div className='currency'>
              <label htmlFor="byn">
                <p className='cur'>BYN</p>
              </label>
              <input type="number" name='byn' className='price' />
            </div>
            <div className='currency'>
              <label htmlFor="rub">
                <p className='cur'>RUB</p>
              </label>
              <input type="number" name='rub' className='price' />
            </div>
            <div className='currency'>
              <label htmlFor="eur">
                <p className='cur'>EUR</p>
              </label>
              <input type="number" name='eur' className='price' />
            </div>
          </div>
        </div>
        <div className='size-wrapper'>
          <div className='size-wrapper_text'>
            <h2>available sizes</h2>
          </div>
          <div className="size-container">
            <div className="size">
              <label htmlFor="xss">
                <p className="size-title">xss</p>
              </label>
              <input type="number" name='xss' className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="xs">
                <p className="size-title">xs</p>
              </label>
              <input type="number" name='xs'  className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="s">
                <p className="size-title">s</p>
              </label>
              <input type="number" name='s' className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="m">
                <p className="size-title">m</p>
              </label>
              <input type="number" name='m' className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="l">
                <p className="size-title">l</p>
              </label>
              <input type="number" name='l' className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="xl">
                <p className="size-title">xl</p>
              </label>
              <input type="number" name='xl' className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="xxl">
                <p className="size-title">xxl</p>
              </label>
              <input type="number" name='xxl' className='input-size' />
            </div>
            <div className="size">
              <label htmlFor="os">
                <p className="size-title">os</p>
              </label>
              <input type="number" name='os' className='input-size' />
            </div>
          </div>
        </div>
        <div className="description">
          <div className="description-wrapper">
            <h2>description</h2>
            <input type="text" className='input-description' />
          </div>
        </div>
        <div className="categories">
          <div className="categories-wrapper">
            <h2 className='categories-title'>categories</h2>
            <p className='cat'>use space as separator</p>
            <input type="text" className='input-categories' />
          </div>
        </div>
        <div className="button">
          <p className='btn'>ADD</p>
          <figure className='line'></figure>
        </div>
      </form>
    </div>
  )
}

export default Add