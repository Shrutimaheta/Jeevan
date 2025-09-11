
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import ImageWithBasePath from "../../components/image-with-base-path";
import '../../../node_modules/swiper/swiper.css'


const CallUsersSwiper = () => {
  const users = [
    {
      img: "assets/img/avatars/avatar-66.jpg",
      name: "Rosa Shelby",
    },
    {
      img: "assets/img/avatars/avatar-67.jpg",
      name: "Allen Snyder",
      audioWave: "assets/img/icons/audio-wave.svg",
    },
    {
      img: "assets/img/avatars/avatar-59.jpg",
      name: "Charlotte Ayala",
    },
    {
      img: "assets/img/avatars/avatar-68.jpg",
      name: "Andrew Foster",
    },
    {
      img: "assets/img/avatars/avatar-60.jpg",
      name: "Robert Fassett",
    },
    {
      img: "assets/img/avatars/avatar-61.jpg",
      name: "Andrew Fletcher",
    },
  ];

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={24}
      keyboard={{ enabled: true }}
      loop
      breakpoints={{
        320: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 3 },
        1300: { slidesPerView: 4 },
      }}
      modules={[Keyboard]}
      className="call-users"
    >
      {users.map((user, index) => (
        <SwiperSlide key={index}>
          <div className="position-relative">
            <ImageWithBasePath
              src={user.img}
              className="img-fluid rounded"
              alt={user.name}
            />
            {user.audioWave && (
              <span className="position-absolute top-0 start-0 p-2">
                <ImageWithBasePath src={user.audioWave} alt="audio wave" />
              </span>
            )}
            <div className="position-absolute bottom-0 start-0 w-100 p-2">
              <span className="badge bg-white text-dark w-100">
                {user.name}
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CallUsersSwiper;
