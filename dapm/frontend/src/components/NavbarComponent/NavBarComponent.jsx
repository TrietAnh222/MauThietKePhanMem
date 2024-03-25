import { Checkbox, Col, Rate, Row } from 'antd'
import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { useState } from 'react'
import { useEffect } from 'react'
import * as ProductService from '../../services/ProductService'

const NavBarComponent = () => {
    const onChange = () => { }

    //Lọc sản phẩm
    const [typeProducts, setTypeProducts] = useState([])
    //Lấy danh mục loại sản phẩm
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK') {
          setTypeProducts(res?.data)
        }
      }

      useEffect(() => {
        fetchAllTypeProduct()
      }, [])
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ dispaly: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`tu ${option}  sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLableText>Thương Hiệu</WrapperLableText>
            <WrapperContent>
                {/* {renderContent('text', ['Tu lanh', 'TV', 'MAYGIAT'])} */}
                {typeProducts.map((item) => {
                    return (
                    <TypeProduct name={item} key={item}/>
                    )
                })}
            </WrapperContent>
            <renderContent type={'text'}/>
            
            
        </div>

    )
}

export default NavBarComponent