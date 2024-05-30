FROM golang:1.20-alpine
ENV CGO_ENABLED=1
RUN apk add --no-cache sqlite
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache gcc musl-dev

WORKDIR /app
COPY . .
WORKDIR ./main
RUN go get
RUN go build -o server server.go Cart.go CartController.go Category.go CategoryController.go Product.go ProductController.go
EXPOSE 9000
CMD ["./server"]