import React from "react";

function BannerCard({ username }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
      <div class="block rounded-xl bg-white p-6 sm:p-8" href="">
        <div class="sm:pr-8">
        <h3 class="h1 font-bold text-gray-900">{username}</h3>
          <h3 class="h3 font-bold text-gray-900">{username}</h3>

          <p class="mt-2 text-sm text-gray-500">Administrator</p>
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
