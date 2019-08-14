# codeinthedark_rating

## How to
1. Create docker image
```
docker build . -t img_citd_rating
```

2. run docker container
```
docker run --name citd_rating -p 8000:8000 -p 8001:8001 img_citd_rating
```