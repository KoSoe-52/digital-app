import React from 'react'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ThreeSkeleton = () => {
  return (
    <>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={14} />
        </SkeletonTheme>
    </>
  )
}

export default ThreeSkeleton