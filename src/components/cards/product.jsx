'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// mui
import { Box, Card, Typography, Stack, IconButton, useMediaQuery, Tooltip, Skeleton, Zoom } from '@mui/material';
// components
import { useDispatch } from 'src/redux/store';
import { setWishlist } from 'src/redux/slices/wishlist';
import { addCompareProduct, removeCompareProduct } from '../../redux/slices/compare';
import ColorPreviewGroup from 'src/components/colorPreviewGroup';

import BlurImage from 'src/components/blurImage';
// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
// api
import * as api from 'src/services';
// icons
import { IoMdHeartEmpty } from 'react-icons/io';
import { GoEye } from 'react-icons/go';
import { GoGitCompare } from 'react-icons/go';
import { IoIosHeart } from 'react-icons/io';
import { FaRegStar } from 'react-icons/fa';
// dynamic
const ProductDetailsDialog = dynamic(() => import('../dialog/productDetails'));
export default function ShopProductCard({ ...props }) {
  const { product, loading } = props;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  const [open, setOpen] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  // type error
  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { products: compareProducts } = useSelector(({ compare }) => compare);

  const { isAuthenticated } = useSelector(({ user }) => user);
  const isTablet = useMediaQuery('(max-width:900px)');
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation(api.updateWishlist, {
    onSuccess: (data) => {
      toast.success(data.message);
      setLoading(false);
      dispatch(setWishlist(data.data));
    },
    onError: (err) => {
      setLoading(false);
      const message = JSON.stringify(err.response.data.message);
      toast.error(t(message ? t('common:' + JSON.parse(message)) : t('common:something-wrong')));
    }
  });

  const { name, slug, _id, averageRating } = !loading && product;
  const linkTo = `/product/${slug ? slug : ''}`;

  const onClickWishList = async (event) => {
    if (!isAuthenticated) {
      event.stopPropagation();
      router.push('/auth/login');
    } else {
      event.stopPropagation();
      setLoading(true);
      await mutate(_id);
    }
  };
  const onAddCompare = async (event) => {
    event.stopPropagation();
    toast.success('Added to compare list');
    dispatch(addCompareProduct(product));
  };

  const onRemoveCompare = async (event) => {
    event.stopPropagation();
    toast.success('Removed from compare list');
    dispatch(removeCompareProduct(_id));
  };
  return (
    <Card
      onMouseEnter={() => !isLoading && setOpenActions(true)}
      onMouseLeave={() => setOpenActions(false)}
      sx={{
        display: 'block',
        borderRadius: '8px',
        boxShadow: 'unset'
      }}
    >
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <Box
          {...(product?.available > 0 && {
            component: Link,
            href: linkTo
          })}
          sx={{
            bgcolor: isLoading || loading ? 'transparent' : 'common.white',
            position: 'relative',
            cursor: 'pointer',

            '&:after': {
              content: `""`,
              display: 'block',
              paddingBottom: '100%'
            },
            width: '100%'
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{
                height: '100%',
                position: 'absolute'
              }}
            />
          ) : (
            <Box component={Link} href={linkTo}>
              {product && product?.images?.length > 0 && product?.images[0]?.images.length > 0 && (
                <BlurImage
                  alt={name}
                  src={
                    process.env.IMAGE_BASE == 'LOCAL'
                      ? `${process.env.IMAGE_URL}${product?.images[0]?.images[0]}`
                      : product?.images[0]?.images[0]
                  }
                  fill
                  draggable="false"
                  objectFit="cover"
                />
              )}
            </Box>
          )}
        </Box>
        <Zoom in={openActions}>
          <Box>
            {}
            <Stack
              direction={'row'}
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translate(-50%, 0px)',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                p: '2px',
                zIndex: 11
              }}
            >
              {
                <Tooltip title="Add to cart">
                  <IconButton
                    aria-label="add to cart"
                    disabled={loading}
                    onClick={() => setOpen(true)}
                    size={isTablet ? 'small' : 'medium'}
                  >
                    <GoEye />
                  </IconButton>
                </Tooltip>
              }

              {wishlist?.filter((v) => v === _id).length > 0 ? (
                <Tooltip title="Remove from wishlist">
                  <IconButton
                    disabled={isLoading}
                    onClick={onClickWishList}
                    aria-label="Remove from wishlist"
                    color="primary"
                    size={isTablet ? 'small' : 'medium'}
                  >
                    <IoIosHeart />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Add to wishlist">
                  <IconButton
                    disabled={isLoading}
                    onClick={onClickWishList}
                    aria-label="add to wishlist"
                    size={isTablet ? 'small' : 'medium'}
                  >
                    <IoMdHeartEmpty />
                  </IconButton>
                </Tooltip>
              )}
              {compareProducts?.filter((v) => v._id === _id).length > 0 ? (
                <Tooltip title="Remove from cart">
                  <IconButton
                    disabled={isLoading}
                    onClick={onRemoveCompare}
                    aria-label="Remove from compare"
                    color="primary"
                    size={isTablet ? 'small' : 'medium'}
                  >
                    <GoGitCompare />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Add to compare">
                  <IconButton
                    disabled={isLoading}
                    onClick={onAddCompare}
                    aria-label="add to compare"
                    size={isTablet ? 'small' : 'medium'}
                  >
                    <GoGitCompare />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
        </Zoom>
      </Box>

      <Stack
        justifyContent="center"
        sx={{
          zIndex: 111,
          p: 1,
          width: '100%',

          a: {
            color: 'text.primary',
            textDecoration: 'none'
          }
        }}
      >
        <Box sx={{ display: 'grid' }}>
          {' '}
          <Typography
            sx={{
              cursor: 'pointer',
              textTransform: 'capitalize'
              // fontWeight: 500,
            }}
            {...(product?.available > 0 && {
              component: Link,
              href: linkTo
            })}
            variant={'subtitle1'}
            noWrap
          >
            {loading ? <Skeleton variant="text" width={120} /> : name}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {loading ? (
              <Skeleton variant="text" width={72} />
            ) : (
              <>
                <FaRegStar /> ({averageRating?.toFixed(1) || 0})
              </>
            )}
          </Typography>
          {loading ? (
            <Skeleton variant="text" width={72} />
          ) : (
            <ColorPreviewGroup limit={3} colors={product?.colors} sx={{ minWidth: 72 }} />
          )}
        </Stack>
        {
          product?.priceSale == product?.price ? (
            <Stack spacing={0.5} direction="row" justifyContent={'space-between'} alignItems="center">
            <Typography
              variant={isTablet ? 'body1' : 'h5'}
              component="p"
              sx={{
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                '& .discount': {
                  fontSize: { md: 14, xs: 12 },
                  fontWeight: 600,
                  color: 'error.main',
                  ml: 0.5
                }
              }}
            >
              {loading ? (
                <Skeleton variant="text" width={120} />
              ) : (
                <>
                  <span>{fCurrency(cCurrency(product?.priceSale))}</span>
                </>
              )}
            </Typography>
          </Stack>
          ) : (
            <Stack spacing={0.5} direction="row" justifyContent={'space-between'} alignItems="center">
              <Typography
                variant={isTablet ? 'body1' : 'h5'}
                component="p"
                sx={{
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  '& .discount': {
                    fontSize: { md: 14, xs: 12 },
                    fontWeight: 600,
                    color: 'error.main',
                    ml: 0.5
                  }
                }}
              >
                {loading ? (
                  <Skeleton variant="text" width={120} />
                ) : (
                  <>
                  <span style={{fontSize: '20px'}}>{fCurrency(cCurrency(product?.priceSale))}</span>
                    <strike style={{textDecoration: 'line-through', fontSize: '16px', marginLeft: '5px', marginRight: '5px'}}>{fCurrency(cCurrency(product?.price))}</strike>
                    
                    <span className="discount">
                      ({`${product.discount}%`})
                    </span>
                  </>
                )}
              </Typography>
            </Stack>
          )
        }
       
      </Stack>
      {open && <ProductDetailsDialog slug={product.slug} open={open} onClose={() => setOpen(false)} />}
    </Card>
  );
}
ShopProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string,
    sku: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
    priceSale: PropTypes.number,
    available: PropTypes.number,
    colors: PropTypes.array,
    averageRating: PropTypes.number
  }),
  loading: PropTypes.bool.isRequired
};