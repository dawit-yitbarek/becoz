import React from 'react';

// Skeleton for Listing section
export function SkeletonListing() {
  return (
    <div className="animate-pulse space-y-4 p-4 bg-[#1B1B1B] rounded-md border border-[#2F2F2F] shadow-md">
      <div className="h-48 bg-[#2A2A2A] rounded-md w-full" />
      <div className="h-4 bg-[#2F2F2F] rounded w-3/4" />
      <div className="h-4 bg-[#2F2F2F] rounded w-1/2" />
      <div className="h-3 bg-[#2F2F2F] rounded w-1/4" />
    </div>
  );
};


// Skeleton for featured property section
export function SkeletonFeatured() {
  return (
    <section className="my-20 bg-gradient-to-br from-[#1a1a1a] to-[#111] p-8 rounded-xl border border-[#FFCB74]/30 shadow-lg max-w-7xl mx-auto animate-pulse">
      <h3 className="text-2xl font-bold text-[#FFCB74] mb-6">🔥 Featured Property</h3>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 h-64 bg-[#2A2A2A] rounded-lg" />
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-6 w-3/4 bg-[#2F2F2F] rounded-md" />
          <div className="h-4 w-full bg-[#2F2F2F] rounded-md" />
          <div className="h-4 w-1/2 bg-[#2F2F2F] rounded-md" />
          <div className="h-10 w-40 bg-[#FFCB74]/40 rounded-full" />
        </div>
      </div>
    </section>
  );
};


// Skeleton for details section
export function SkeletonDetails() {
  return (
    <section className="bg-[#111] text-[#A0A0A0] font-[Poppins] py-30 px-6 animate-pulse">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* Gallery Placeholder */}
        <div className="relative rounded-xl overflow-hidden border border-[#2F2F2F] bg-[#1C1C1C] h-[360px] sm:h-[450px]">
          <div className="w-full h-full bg-[#2F2F2F]"></div>
          <div className="absolute left-3 top-1/2 w-10 h-10 bg-[#2F2F2F] rounded-full" />
          <div className="absolute right-3 top-1/2 w-10 h-10 bg-[#2F2F2F] rounded-full" />
        </div>

        {/* Text Placeholder */}
        <div>
          <div className="w-28 h-4 bg-[#2F2F2F] mb-4 rounded" />
          <div className="w-3/4 h-8 bg-[#2F2F2F] mb-4 rounded" />
          <div className="w-1/2 h-6 bg-[#2F2F2F] mb-2 rounded" />
          <div className="w-1/3 h-4 bg-[#2F2F2F] mb-6 rounded" />
          <div className="w-full h-20 bg-[#2F2F2F] mb-6 rounded" />

          <div className="mb-8">
            <div className="w-32 h-5 bg-[#2F2F2F] mb-3 rounded" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-[#2F2F2F] rounded w-3/4" />
              ))}
            </div>
          </div>

          <div className="w-40 h-10 bg-[#2F2F2F] rounded" />
        </div>
      </div>
    </section>
  );
};


// Skeleton for testimonial section
export function SkeletonTestimonial() {
  return (
    <section className="relative z-10 bg-[#111111] text-[#A0A0A0] py-20 px-4 sm:px-6 font-[Poppins] animate-pulse">
      <div className="max-w-3xl mx-auto text-center relative px-2 sm:px-4">
        <h3 className="text-3xl font-bold text-white mb-12">What Our Clients Say</h3>

        <blockquote className="italic px-6 py-8 bg-[#1C1C1C] border border-[#2F2F2F] rounded-xl shadow-[0_0_20px_rgba(255,203,116,0.05)]">
          <div className="h-6 bg-[#2F2F2F] rounded mb-3 w-11/12 mx-auto"></div>
          <div className="h-6 bg-[#2F2F2F] rounded mb-3 w-9/12 mx-auto"></div>
          <div className="h-6 bg-[#2F2F2F] rounded mb-3 w-10/12 mx-auto"></div>
          <div className="h-4 bg-[#2F2F2F] rounded mt-6 w-24 mx-auto"></div>
        </blockquote>

        <div className="flex justify-center gap-6 mt-8">
          <div className="w-10 h-10 bg-[#2F2F2F] rounded-full" />
          <div className="w-10 h-10 bg-[#2F2F2F] rounded-full" />
        </div>
      </div>
    </section>
  );
};


// Skeleton for manage properties section
export function SkeletonAdminProperties({ count = 3 }) {
  return (
    <div className="grid gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[#1F1F1F] p-5 rounded-xl border border-[#FFCB74]/20 shadow-lg flex flex-col sm:flex-row sm:items-center gap-5"
        >
          <div className="w-full sm:w-auto">
            <div className="w-full sm:w-32 h-40 sm:h-24 bg-[#2F2F2F] rounded-md border border-[#2F2F2F]"></div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-[#2F2F2F] rounded"></div>
            <div className="h-4 w-1/4 bg-[#2F2F2F] rounded"></div>
            <div className="h-4 w-2/4 bg-[#FFCB74]/30 rounded"></div>
            <div className="h-4 w-1/2 bg-[#2F2F2F] rounded"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:ml-4 w-full sm:w-auto">
            <div className="h-10 w-full sm:w-20 bg-[#FFCB74]/50 rounded"></div>
            <div className="h-10 w-full sm:w-20 bg-red-600/40 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};