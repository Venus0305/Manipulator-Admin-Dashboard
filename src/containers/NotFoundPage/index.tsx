import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="h-screen relative">
      <img alt="" className="w-full h-full object-cover" src="/images/image.png" />
      <div className="top-[20%] absolute translate-x-1/2 right-1/2 w-full p-4">
        <div className="text-[60px] text-[#745700] text-center">404</div>
        <div className="text-[18px] text-[#745700] text-center">
          お探しのページが見つかりませんでした トップから再度お試しください!
        </div>
        <div className="flex justify-center mt-4">
          <Link replace to="/">
            <Button ghost size="large" type="primary">
              トップに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
