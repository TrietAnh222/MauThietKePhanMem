import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { useState } from 'react'
import * as ProductService from '../../services/ProductService'
import { Col, Pagination, Row } from 'antd'
import { useEffect } from 'react'
import { WrapperTypeProduct, WrapperProducts } from './style'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import { useLocation } from 'react-router-dom'
import CardComponent from '../../components/CardComponent/CardComponent'
import Loading from '../../components/LoadingComponent/Loading'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  //categories
  const [typeProducts, setTypeProducts] = useState([])

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  //ten duong dan
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if(id) {
        const res = await ProductService.getDetailsProduct(id)
        return res.data
    }
  }

  const { isLoading, data: productDetails } = useQuery(['product-details', id], fetchGetDetailsProduct, { enabled : !!id})

  //San pham lien quan
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)

    // const { state}  = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 6,
        total: 1,
    })
    
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        
        if(res?.status === 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate({...panigate, total: res?.totalPage})
            
        }else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(productDetails){
            fetchProductType(productDetails?.type, panigate.page, panigate.limit)
        }
    }, [productDetails?.type,panigate.page, panigate.limit])


    const onChange = (current, pageSize) => {
        setPanigate({...panigate, page: current - 1, limit: pageSize})    
    }
    ///


  return (
    <Loading isLoading={loading}>
    <div style={{width: '100%',background: '#efefef', height: '100%',paddingBottom: '10px'}}>
      <div style={{ width: '1270px', margin:'0 auto'}}>
      <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item}/>
            )
          })}
        </WrapperTypeProduct>
      </div>
     
      <div style={{ width: '1270px', height: '100%', margin: '0 auto'}} >
        
        <h5 style={{ fontSize: '15px', borderBottom: '3px solid red', padding: '5px'}}><span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate('/')}}>Trang chủ</span>  -  {productDetails?.type}  -  {productDetails?.name}</h5>
        <ProductDetailsComponent idProduct={id} />
      </div>
      <div style={{ width: 'auto', backgroundColor: '#efefef', paddingTop: '20px', fontWeight: 'bold', fontSize: '30px', /* paddingLeft: '185px' */ textAlign: 'center'}}>
                Sản Phẩm Liên Quan
          </div>

      {/* //San pham lien quan */}
      <Loading isLoading={loading}>
      <Col span={24} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                            <WrapperProducts >
                                {products?.filter((pro) => {
                                    if(searchDebounce === '') {
                                        return pro
                                    }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product) => {
                                    return (
                                        <CardComponent
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            selled={product.selled}
                                            discount={product.discount}
                                            id={product._id}
                                        />
                                    )
                                })}
                            </WrapperProducts>
                            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                        </Col>
                        </Loading>

    </div>
    
  </Loading>
  )
}

export default ProductDetailsPage